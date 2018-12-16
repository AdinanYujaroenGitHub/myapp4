import React from 'react';
import firebase from 'react-native-firebase';

const firestore = firebase.firestore();

import CommentForm from './CommentForm';

class AddCommentScreen extends React.Component {/*�͹���ⴹ���¡�� props �� id �Ҵ���*/
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
    const { navigation } = this.props;//�������������Ѻ�����ٻẺ�ͧ navigation �ѧ��鹨֧��ͧ���ҧ��Ẻ navigation
    const albumId = navigation.getParam('albumId');//�Ѻ��� id ��
    const albumRef = firestore.collection('albums')
                              .doc(albumId);//�֧�����ŵ�� id
    const collection = albumRef.collection('comments');//���������ǡ��ͧ仴֧ collection comment �ԡ�ͺ

    firestore.runTransaction((t) => { /*t ��Ҩ��繵��᷹��÷���¡���տѧ����������͡������ */
        /* ��� t ������ set update delete get ��觨�价ӡѺ database ��ǹ�����ҵ�ͧ���*/
      return t.get(albumRef)
        .then((albumDoc) => {
          const { rating_count, avg_rating } = albumDoc.data();//�ʴ���ҡ�÷�Ẻ����仴֧�����Ţͧ����÷���ժ��͹����������
          let new_rating_count, new_avg_rating;//let ��ͻ�С����������ǧ����Դ�Դ �����ҹ�� 

            if (rating_count === undefined) {//����ѧ����դ����������� ����������� 1 �����ǹ� ��� � �͹���
              //�������դ�������ѹ���� undefined
            new_rating_count = 1;
            new_avg_rating = comment.rating;
          }
          else {
            new_rating_count = rating_count + 1;//������Ҥ���������
            new_avg_rating = /*������ա���纤�� rating ��͹˹�� �зӡ����������� * �Ѻ�ӹǹ����� + rating ������ rating ���*/
              ((avg_rating * rating_count) + comment.rating)
              / new_rating_count;
          }

            const newCommentRef = collection.doc();//��������� collection comment ���� 
            /*����觹��������������㹹�鹷ӧҹ���稡�͹ ����仵�� */
          return Promise.all([ 
            t.set(newCommentRef, { /*�絤�ҵ�ҧ� �ͧ newCommentRef ���� state ���� comment*/
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
      //��������ͧ��ǹ�� � ��ҡѺ state �ͧ��Ǣͧ��� 
    return (
      <CommentForm
        comment={comment}
        onCommentChanged={this.handleCommentChanged}
        onAddComment={this.handleAddComment}
        disabled={disableForm} /*��ѧ�ҡ����ҹ handleAddComment �����Ǩз�����ѹ�դ���� true*/
      />
    );
  }
}

export default AddCommentScreen;
