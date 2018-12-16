import React from 'react';
import firebase from 'react-native-firebase';

const firestore = firebase.firestore();

import CommentForm from './CommentForm';

class AddCommentScreen extends React.Component {/*ตอนที่โดนเรียกได้ props เป็น id มาด้วย*/
  static navigationOptions = {
    title: 'Add a comment',
  };

  state = {
    comment: {
      name: '',
      rating: 3,
      comment: '',
    },
    disableForm: false,
  };

  handleAddComment = () => {
    this.setState({ disableForm: true });

    const { comment } = this.state;
    const { navigation } = this.props;//พารามิเตอร์ที่รับมาเป็นรูปแบบของ navigation ดังนั้นจึงต้องสร้างเป็นแบบ navigation
    const albumId = navigation.getParam('albumId');//รับค่า id มา
    const albumRef = firestore.collection('albums')
                              .doc(albumId);//ดึงข้อมูลตาม id
    const collection = albumRef.collection('comments');//พอเข้าไปแล้วก้ต้องไปดึง collection comment อิกรอบ

    firestore.runTransaction((t) => { /*t น่าจะเป็นตัวแทนการทำรายการมีฟังก์ชั่นให้เลือกทำเยอะ */
        /* ที่ t ทำได้คือ set update delete get ซึ่งจะไปทำกับ database ส่วนที่เราต้องการ*/
      return t.get(albumRef)
        .then((albumDoc) => {
          const { rating_count, avg_rating } = albumDoc.data();//แสดงว่าการทำแบบนี้จะไปดึงข้อมูลของตัวแปรที่มีชื่อนี้มาได้จำไว้
          let new_rating_count, new_avg_rating;//let คือประกาศให้ใช้แค่ในวงเล็บเปิดปิด นี้เท่านั้น 

            if (rating_count === undefined) {//ถ้ายังไม่มีคนให้ดาวมาเลย ก้ให้ไปว่ามี 1 คนแล้วนะ ให้ ณ ตอนนี้
              //ถ้าไม่มีคนให้ดาวมันจะเป็น undefined
            new_rating_count = 1;
            new_avg_rating = comment.rating;
          }
          else {
            new_rating_count = rating_count + 1;//เพิ่มค่าคนที่ให้ดาว
            new_avg_rating = /*จะไม่มีการเก็บค่า rating ก่อนหน้า จะทำการใช้ค่าเฉลี่ย * กับจำนวนคนให้ + rating ใหม่เป็น rating รวม*/
              ((avg_rating * rating_count) + comment.rating)
              / new_rating_count;
          }

            const newCommentRef = collection.doc();//เริ่มเข้าไป collection comment แล้ว 
            /*คำสั่งนี้คือรอให้ทั้งหมดในนั้นทำงานเสร็จก่อน ค่อยไปต่อ */
          return Promise.all([ 
            t.set(newCommentRef, { /*เซ็ตค่าต่างๆ ของ newCommentRef ไว้ใน state ชื่อ comment*/
              ...comment,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            }),
            t.update(albumRef, {
              rating_count: new_rating_count,
              avg_rating: new_avg_rating,
            }),
          ]);
        });
    }).then(() => navigation.pop());
  }

  handleCommentChanged = (comment) => {
    this.setState({ comment });
  }

  render() {
    const { comment, disableForm } = this.state;
      //ให้ตัวแปรสองตัวนี้ ไป เท่ากับ state สองตัวของเรา 
    return (
      <CommentForm
        comment={comment}
        onCommentChanged={this.handleCommentChanged}
        onAddComment={this.handleAddComment}
        disabled={disableForm} /*หลังจากที่ผ่าน handleAddComment มาแล้วจะทำให้มันมีค่าเป็น true*/
      />
    );
  }
}

export default AddCommentScreen;
