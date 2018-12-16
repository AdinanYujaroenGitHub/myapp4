import React from 'react';
import {
  Button,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { Rating } from 'react-native-ratings';
//การจะส่งค่าข้าม ไฟล์กันเลย ต้องใช้ navigation ส่ง พารามิเตอร์กัน 
class CommentForm extends React.Component {/*ได้รับ props เป็นโครงของ คอมเม้นมา*/
  handleNameChanged = (text) => {
      const { comment, onCommentChanged } = this.props;
      //onCommentChanged คือ handleCommentChanged ซึ่งมีหน้าที่ รับค่าคอมเม้นมาแล้วก้ setState
    if (typeof onCommentChanged === 'function') {/*เช็คว่าสิ่งที่ได้รับมาเป็น ฟังก์ชั่นไหม */
      onCommentChanged({
        ...comment,
        name: text,
      });
    }
  }

  handleRatingChanged = (rating) => {
    const { comment, onCommentChanged } = this.props;//อ๋อ props นี้คือ props ของรวม
    if (typeof onCommentChanged === 'function') {
      onCommentChanged({ /*ฟังก์ที่รับมาจะเปนตัวเข้าไปเปลี่ยนข้อมูลใน collection comment*/
        ...comment,
        rating,
      });
    }
  }

  handleCommentChanged = (text) => { /*text ได้ คอมเม้นที่ผู้ใช้ใส่มา*/
    const { comment, onCommentChanged } = this.props;
    if (typeof onCommentChanged === 'function') {
      onCommentChanged({
        ...comment, 
        comment: text, /*ใส่คอมเม้นที่ได้ลงไป */
      });
    }
  }

  render() {
    const {
      comment: { name, rating, comment },
      onAddComment,
      disabled,
    } = this.props;
    return (
      <View style={styles.container}>
        <TextInput /*รับค่าเข้ามา เก็บไว้ในตัวแปร name และส่งเป็นพารามิเตอร์ไปที่ handleNameChanged*/
          placeholder="Name"
          value={name}
          onChangeText={this.handleNameChanged}
          editable={!disabled}
        />
        <View style={styles.ratingWrapper}>
          <Rating
            type="star"
            showRating={true}
            imageSize={32}
            fraction={0}
            startingValue={rating}
            onFinishRating={this.handleRatingChanged}/*รับค่า rating ปัจจุบันไปด้วย*/
          />
        </View>
        <TextInput
          placeholder="Comment"
          style={styles.comment}
          multiline={true}
          value={comment}
          onChangeText={this.handleCommentChanged}
          editable={!disabled}
        />
        <Button
          title="Add a comment"
          onPress={onAddComment}
          disabled={disabled}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'white',
  },
  ratingWrapper: {
    alignSelf: 'center',
  },
  comment: {
    height: 160,
    textAlignVertical: 'top',
  },
});

export default CommentForm;
