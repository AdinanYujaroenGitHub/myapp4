import React,{ Component } from 'react';
import { AppRegistry, View, StyleSheet, ScrollView, Image } from 'react-native'
import { Container, Header, Content, Footer, Thumbnail, FooterTab, Body, Picker, Segment, headerStyle, Button, Icon, Text, CheckBox, Textarea, Form, ListItem } from 'native-base';
import firebase from 'react-native-firebase';
const firestore = firebase.firestore();

export default class MyPicker extends Component {
    constructor(props) {
        super(props);
        
    }
    state = {
        AllTime: [],
        selected: 'key0',
        test: [{
            id: 'IVFSgng5msi3UOJ3oD2u',
            time: '08:00-08:30',
            wait_que: 0,
            max_que: 15
        },
        {
            id: 'bDWFdFSUkFCfS8ajcKNV',
            time: '09:00-09:30',
            wait_que: 0,
            max_que: 15
        },
        {
            id: 'i3G1MA1iInQg9GxQ5XvX',
            time: '09:30-10:00',
            wait_que: 0,
            max_que: 15
        },
        {
            id: 'uVQGzcBO6uANnGjeC7A1',
            time: '08:30-09:00',
            wait_que: 0,
            max_que: 15
        }]
    }
    subscribeToFirestoreQues = () => {
        let tmp = this.props.resId;
        const res = firestore.collection('restaurant').doc(tmp);
        const ques = res.collection('ques');
        this.subscriptionQues = ques.onSnapshot((snapshot) => {
            this.updateStateQues(snapshot.docs);
        })

        
    }
    updateStateQues(docs) {
        
        const AllTime = docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }));
        console.log("update Ques:.............;++++--//**", AllTime)
        this.setState({ AllTime });

    }
    unsubscribeFromFirestoreQues() {
        this.subscriptionQues();
    }
    componentDidMount() {/*จุดเริ่มต้นของแอพ เลย */
        this.subscribeToFirestoreQues();//go to function
    }

    onValueChange = (value: String) => {
        this.setState({
            selected: value
        });
    }
    render() {
        console.log("prop resId :**++ ", this.props.resId)
        console.log("length of AllTime", this.state.AllTime.length)
        if (this.state.AllTime.length != 0) {
            return (
                <Form>
                    <Picker
                        mode="dropdown"
                        headerBackButtonTextStyle={{ color: "#fff" }}
                        headerTitleStyle={{ color: "#fff" }}
                        selectedValue={this.state.selected}
                        onValueChange={this.onValueChange.bind(this)}
                    >

                        {this.state.AllTime.map((t) => {
                            console.log(t);
                            return (<Picker.Item key={t.id} label = { t.time } value={t.time} />);
                            
                        }) }

                    </Picker>
                </Form>
            );
        }
        return (
            <Text>wait </Text>
            );
        
    }
}
