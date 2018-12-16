import React from 'react';
import {
  Button,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { Rating } from 'react-native-ratings';
//��è��觤�Ң��� ���ѹ��� ��ͧ�� navigation �� ����������ѹ 
class CommentForm extends React.Component {/*���Ѻ props ���ç�ͧ ��������*/
  handleNameChanged = (text) => {
      const { comment, onCommentChanged } = this.props;
      //onCommentChanged ��� handleCommentChanged �����˹�ҷ�� �Ѻ��Ҥ����������ǡ� setState
    if (typeof onCommentChanged === 'function') {/*�������觷�����Ѻ���� �ѧ������� */
      onCommentChanged({
        ...comment,
        name: text,
      });
    }
  }

  handleRatingChanged = (rating) => {
    const { comment, onCommentChanged } = this.props;//��� props ����� props �ͧ���
    if (typeof onCommentChanged === 'function') {
      onCommentChanged({ /*�ѧ�����Ѻ�Ҩ�໹�����������¹������� collection comment*/
        ...comment,
        rating,
      });
    }
  }

  handleCommentChanged = (text) => { /*text �� �����鹷�����������*/
    const { comment, onCommentChanged } = this.props;
    if (typeof onCommentChanged === 'function') {
      onCommentChanged({
        ...comment, 
        comment: text, /*�������鹷����ŧ� */
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
        <TextInput /*�Ѻ�������� �����㹵���� name ������繾���������价�� handleNameChanged*/
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
            onFinishRating={this.handleRatingChanged}/*�Ѻ��� rating �Ѩ�غѹ仴���*/
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
