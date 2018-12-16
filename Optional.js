import React, { Component } from 'react'
import { AppRegistry, View, StyleSheet, ScrollView, Image, TextInput} from 'react-native'
import { Container, Header, Content, Footer, Thumbnail, FooterTab, Body, Picker, Segment, headerStyle, Button, Icon, Text, CheckBox, Textarea, Form, ListItem } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import firebase from 'react-native-firebase';


const firestore = firebase.firestore();

export default class Optional extends Component {

    state = {
        unit: 1,
        userListOrder: {},
        selected: "",
        chkEgg: {
            Omlet: 'white',
            Segg: 'white'
        },
        chkExtra: 'white',
        chkPD: {
            chkdisk: 'white',
            chkpack: 'white'
        }, resDetail: {},
        menus: {},
        option: {},
        AllTime: [],
        detail: '',
        menu: '',
        optionEgg: '',
        optionFood: false,
        price: 0,
        restaurant: '',
        timeC: '',
        ware: '',
        time: {},

    };
    do = () => {
        this.setState({
            a: 5,
            check: true
        });

    };
    extra = () => {
        if (this.state.chkExtra == 'white') {
            this.setState({
                chkExtra: '#e8a806',
                price: this.state.price + (this.state.option.extra * this.state.unit),
                optionFood: true
            })
        }
        else {
            this.setState({
                chkExtra: 'white',
                price: this.state.price - (this.state.option.extra * this.state.unit),
                optionFood: false
            })
        }

    };
    moreEggStar = () => {
        if (this.state.optionEgg == '') {
            this.setState({
                chkEgg: {
                    Omlet: 'white',
                    Segg: '#e8a806'
                },
                optionEgg: 'star egg'
            })
            this.addPrice('moreEggStarNewPress');
        } else if (this.state.optionEgg == 'star egg') {
            this.setState({
                chkEgg: {
                    Omlet: 'white',
                    Segg: 'white'
                },
                optionEgg: ''
            })
            this.addPrice('moreEggStarFromStar');
        } else if (this.state.optionEgg == 'Omlet') {
            this.setState({
                chkEgg: {
                    Omlet: 'white',
                    Segg: '#e8a806'
                },
                optionEgg: 'star egg'
            })
            this.addPrice('moreEggStarFromOmlet');
        }



    };
    moreEggOmlet = () => {
        if (this.state.optionEgg == '') {
            this.setState({
                chkEgg: {
                    Omlet: '#e8a806',
                    Segg: 'white'
                }, optionEgg: 'Omlet'
            })
            this.addPrice('moreEggOmletNew');
        } else if (this.state.optionEgg == 'Omlet') {
            this.setState({
                chkEgg: {
                    Omlet: 'white',
                    Segg: 'white'
                },
                optionEgg: ''
            })
            this.addPrice('moreEggOmletFromOmlet');
        } else if (this.state.optionEgg == 'star egg') {
            this.setState({
                chkEgg: {
                    Omlet: '#e8a806',
                    Segg: 'white'
                }, optionEgg: 'Omlet'
            })
            this.addPrice('moreEggOmletFromStar');
        }
        this.addPrice('moreEggOmlet');
    }
    chkPack = () => {
        this.setState({
            chkPD: {
                chkdisk: 'white',
                chkpack: '#e8a806'
            }, ware: 'pack'
        })
    }
    chkDisk = () => {
        this.setState({
            chkPD: {
                chkdisk: '#e8a806',
                chkpack: 'white'
            }, ware: 'disk'
        })
    }
    addUnit = () => {
        this.setState({
            unit: this.state.unit + 1
        })
        this.addPrice('addUnit');
    };
    addPrice = (from) => {
        if (from == 'addUnit') {
            let tmp = this.state.price / (this.state.unit)
            this.setState({ price: this.state.price + tmp })
        } else if (from == 'decUnit') {
            let tmp = this.state.price / (this.state.unit)
            this.setState({ price: this.state.price - tmp })
        } else if (from == 'moreEggStarNewPress') {
            let tmp = this.state.option.star_egg
            this.setState({ price: this.state.price + (this.state.unit * tmp) })
        } else if (from == 'moreEggStarFromStar') {
            let tmp = this.state.option.star_egg
            this.setState({ price: this.state.price - (this.state.unit * tmp) })
        } else if (from == 'moreEggStarFromOmlet') {
            let tmp1 = this.state.option.omlet
            let tmp2 = this.state.option.star_egg
            this.setState({ price: (this.state.price - (this.state.unit * tmp1)) + (this.state.unit * tmp2) })
        } else if (from == 'moreEggOmletNew') {
            let tmp = this.state.option.omlet
            this.setState({ price: this.state.price + (this.state.unit * tmp) })
        } else if (from == 'moreEggOmletFromOmlet') {
            let tmp = this.state.option.omlet
            this.setState({ price: this.state.price - (this.state.unit * tmp) })
        } else if (from == 'moreEggOmletFromStar') {
            let tmp1 = this.state.option.omlet
            let tmp2 = this.state.option.star_egg
            this.setState({ price: (this.state.price - (this.state.unit * tmp2)) + (this.state.unit * tmp1) })
        }
    }
    decUnit = () => {
        if (this.state.unit > 1) {
            this.setState({
                unit: this.state.unit - 1
            })
            this.addPrice('decUnit');
        }

    }

    //********************************** user *************************************
    unsubscribeFromFirestoreUser = () => {
        this.subscriptionUser();//ถึงบอกว่า unsub แต่ก้ยัง sub ยุ**************
    }
    //******************************* ---------------------------


    createCollectionListOrder = () => {
        const myListOrder = {
            dateTime: firebase.firestore.FieldValue.serverTimestamp(),
            detail: this.state.detail,
            menu: this.state.menus.name,
            optionEgg: this.state.optionEgg,
            optionFood: this.state.optionFood,
            price: this.state.price,
            restaurant: this.state.resDetail.name,
            timeC: this.state.timeC,
            unit: this.state.unit,
            ware: this.state.ware
        }
        //************************** หา id user ***********************
        const collection = firestore.collection('user').where("email", "==", "admin@mail.com");
        var collection_key = "";
        this.subscriptionUser = collection.onSnapshot((snapshot) => {
            collection_key = snapshot.docs[0].id
            console.log("Id .... ",collection_key)
            const userC = firestore.collection('user')
                .doc(collection_key); //id ของ user รับ props มา +++++++++++++++++++++++++++++++++++

            userC.collection('list_order').add({ ...myListOrder });
            
        });
        //this.unsubscribeFromFirestoreUser();
        //****************************************************************
        
    }

    updateDatabase=()=>{
        firestore.runTransaction((t) => { /*t น่าจะเป็นตัวแทนการทำรายการมีฟังก์ชั่นให้เลือกทำเยอะ */
            /* ที่ t ทำได้คือ set update delete get ซึ่งจะไปทำกับ database ส่วนที่เราต้องการ*/
            const listOrder = firestore.collection('user').doc('nOLZVHDgnhyTXsrGjfHj').collection('list_order').doc(this.state.userListOrder.id);
            const ques = firestore.collection('restaurant').doc(this.state.resDetail.id).collection('ques');
 
                    /*คำสั่งนี้คือรอให้ทั้งหมดในนั้นทำงานเสร็จก่อน ค่อยไปต่อ */
            return Promise.all([
                t.update(listOrder, {
                    dateTime: firebase.firestore.FieldValue.serverTimestamp(),
                    detail: this.state.detail,
                    menu: this.state.userListOrder.menu,
                    optionEgg: this.state.optionEgg,
                    optionFood: this.state.optionFood,
                    price: this.state.price,
                    restaurant: this.state.userListOrder.restaurant,
                    timeC: this.state.timeC,
                    unit: this.state.unit,
                    ware:this.state.ware
                        }),
                    ]);
                });
        }
    
    //************************** restaurant firestore ************************************************
    subscribeToFirestoreRestaurant = () => {
        const res = firestore.collection('restaurant');
        this.subscriptionRes = res.onSnapshot((snapshot) => {
            this.updateStateResDetail(snapshot.docs);
        })

    }
    updateStateResDetail = (docs) => {
        const restaurant = "restaurant1"//ส่วนนี้เปนส่วนที่รับ prop ชื่อร้านค้า จากแคร์ ++++++++++++++++++++++++++++++
        docs.map((doc) => {
            console.log("name : ....", doc.data().name)
            if (doc.data().name == restaurant) {
                console.log("pass ++++++++")
                this.setState({
                    resDetail: {
                        id: doc.id,
                        ...doc.data()
                    }

                })
            }
        })
        this.subscribeToFirestoreMenus();

    }
    unsubscribeFromFirestoreRestaurant=()=> {
        this.subscriptionRes();
    }
    //*********************************** end restaurant firestore********************************
    //*********************************** menus firestore ***************************************
    subscribeToFirestoreMenus = () => {
        console.log("id :", this.state.resDetail.id)
        const menus = firestore.collection('restaurant').doc(this.state.resDetail.id).collection('menus');
        this.subscriptionMenus = menus.onSnapshot((snapshot) => {
            this.updateStateMenus(snapshot.docs);
        })
    }
    updateStateMenus = (docs) => {
        const menu = 'fired_rice' // รับ props ชื่อเมนูจากแคร์++++++++++++++++++++++++++
        docs.map((doc) => {
            console.log("doc.name menu: ", doc.data().name)
            if (doc.data().name == menu) {

                this.setState({
                    menus: {
                        id: doc.id,
                        ...doc.data()
                    }

                })
            }
        })
        this.subscribeToFirestoreOption();
    }
    unSubscribeToFirestoreMenus = () => {
        this.subscriptionMenus();
    }
    //*********************************** end menus firestore*****************************

    //********************************** optiop firestore **********************************
    subscribeToFirestoreOption = () => {
        const option = firestore.collection('restaurant').doc(this.state.resDetail.id).collection('options');
        this.subscriptionOption = option.onSnapshot((snapshot) => {
            this.updateStateOption(snapshot.docs);
        })
    }
    updateStateOption = (docs) => {
        docs.map((doc) => {
            console.log("doc.name Option: ", doc.data().extra)
            this.setState({
                option: {
                    id: doc.id,
                    ...doc.data()
                }

            })
        })
        this.subscribeToFirestoreQues();
    }
    unSubscribeToFirestoreOption = () => {
        this.subscriptionOption();
    }
    //*********************************** end option firestore **********************************

    //********************************** ques firestore ***********************************
    subscribeToFirestoreQues = () => {
        const ques = firestore.collection('restaurant').doc(this.state.resDetail.id).collection('ques');
        this.subscriptionQues = ques.onSnapshot((snapshot) => {
            this.updateStateQues(snapshot.docs);
        })
    }
    updateStateQues = (docs) => {
        const AllTime = docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }));
        this.setState({ AllTime: AllTime, price: this.state.menus.price });
        this.findTime();
    }
    unSubscribeToFirestoreQues = () => {
        this.subscriptionQues();
    }
    //***************************************** end ques firestore*****************************


    componentDidMount() {/*จุดเริ่มต้นของแอพ เลย */
        //this.subscribeToFirestoreUser();//go to function
        this.subscribeToFirestoreRestaurant();
        //this.subscribeToFirestoreMenus();
        //this.subscribeToFirestoreOption();
        //this.subscribeToFirestoreQues();

    }
    componentWillUnmount() {//จะเรียกเมื่อ component นั้น กำลังจะถูกปิดลง
        //this.unsubscribeFromFirestoreUser();//ไปที่ฟั่งชั่นนี้
        this.unsubscribeFromFirestoreRestaurant();
        this.unSubscribeToFirestoreMenus();
        this.unSubscribeToFirestoreOption();
        this.unSubscribeToFirestoreQues();
    }
    

    onValueChange = (value: String) => {
        this.setState({
            selected: value
        });
        
    }
    findTime = () => {
        let hour = new Date().getHours();
        let minutes = new Date().getMinutes();
        console.log("now Time", hour, minutes);
        var timeCan = [];
        this.state.AllTime.map((t) => {
            hr1 = parseInt(t.time.substring(0, 2))
            hr2 = parseInt(t.time.substring(6, 8))
            mm1 = parseInt(t.time.substring(3, 5))
            mm2 = parseInt(t.time.substring(9, 11))
            if (hr1 > hour || hr2 > hour) {
                timeCan.push(t);
            }
            if (hr1 == hour) {
                if (0 <= minutes && minutes <= 30)
                    timeCan.push(t);
            }
        })

        this.setState({ AllTime: timeCan});
        
    }


    render() {
        return (
            <ScrollView>
                <Container >
                    <Header style={{ backgroundColor: 'blue', height: 25 }} />
                    <Grid >
                        <Row style={{ height: 80 }}>
                            <Col style={{ height: 80, width: 100 }}>
                                <View style={styles.textEgg}>
                                    <Thumbnail square source={{ uri: this.state.resDetail.pic }} />
                                </View>
                            </Col>
                            <Col style={{ height: 80 }}>
                                <Text style={styles.textFont}> {this.state.resDetail.name}{"\n"}</Text>
                                <Text style={styles.textFont}> Cerrent que    minute </Text>
                            </Col>
                        </Row>
                        <Row style={{ height: 80, marginBottom: 2 }}>
                            <Col style={{ height: 80, width: 100 }}>
                                <View style={styles.textEgg}>
                                    <Thumbnail square source={{ uri: this.state.menus.pic }} />
                                </View>
                            </Col>
                            <Col style={{ height: 80 }}>
                                <Text style={{ fontSize: 25 }}> {this.state.menus.name}     {this.state.menus.price} bath</Text>
                            </Col>
                        </Row>
                        <Row style={{ height: 100, marginBottom: 2 }}>
                            <Col onPress={this.extra} style={{ backgroundColor: this.state.chkExtra, height: 100, marginRight: 2, marginLeft: 2 }}>
                                <View style={styles.bottomButton}>
                                    <Text> Extra</Text>
                                    <Text> +{this.state.option.extra} </Text>
                                </View>
                            </Col>

                            <Col onPress={this.moreEggStar} style={{ backgroundColor: this.state.chkEgg.Segg, height: 100, marginRight: 2 }}>
                                <View style={styles.bottomButton}>
                                    <Text> star egg </Text>
                                    <Text> +{this.state.option.star_egg} </Text>
                                </View>
                            </Col>
                            <Col onPress={this.moreEggOmlet} style={{ backgroundColor: this.state.chkEgg.Omlet, height: 100, marginRight: 2 }}>
                                <View style={styles.bottomButton}>
                                    <Text> Omlet </Text>
                                    <Text> +{this.state.option.omlet} </Text>
                                </View>
                            </Col>

                        </Row>
                        <Row style={{ height: 50, marginBottom: 2 }}>
                            <Col style={{ marginLeft: 4, height: 50, marginRight: 4 }}>
                                <View style={styles.bottomButton}>
                                    <Text> {this.state.unit}      </Text>
                                    <Button transparent onPress={this.decUnit}>
                                        <Thumbnail square small source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/mobile-mai-tong-ror.appspot.com/o/icons8-reduce-96.png?alt=media&token=f37fce8a-5c26-4bc0-8d16-2616f9b63e65' }} />
                                    </Button>
                                    <Button transparent onPress={this.addUnit}>
                                        <Thumbnail square small source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/mobile-mai-tong-ror.appspot.com/o/icons8-sum-96.png?alt=media&token=7899cf64-a723-4e6b-96ee-a2d81ae0fa76' }} />
                                    </Button>
                                </View>

                            </Col>
                            <Col style={{ backgroundColor: this.state.chkPD.chkdisk, height: 50, marginRight: 2 }} onPress={this.chkDisk}>
                                <View style={styles.bottomButton} >
                                    <Text> disk </Text>
                                </View>
                            </Col>
                            <Col style={{ backgroundColor: this.state.chkPD.chkpack, height: 50, marginRight: 4 }} onPress={this.chkPack}>
                                <View style={styles.bottomButton} >
                                    <Text> pack </Text>
                                </View>
                            </Col>
                        </Row>
                        <Row style={{ height: 130, marginBottom: 2 }}>
                            <TextInput
                                style={{ height: 130}}
                                multiline={true}
                                numberOfLines={5}
                                placeholder="give me your more detail"
                                onChangeText={(detail) => this.setState({ detail })}
                            />
                        </Row>
                        <Row style={{ height: 50, marginBottom: 2 }}>
                            <Col style={{ height: 50, marginRight: 2, width: 150 }}>
                                <View style={styles.textEgg}>
                                    <Text > Choose your time</Text>
                                </View>

                            </Col>
                            <Col style={{ height: 50 }}>
                                <Form>
                                    <Picker
                                        mode="dropdown"
                                        headerBackButtonTextStyle={{ color: "#fff" }}
                                        headerTitleStyle={{ color: "#fff" }}
                                        selectedValue={this.state.selected}
                                        onValueChange={this.onValueChange.bind(this)}
                                    >
                                        
                                        {this.state.AllTime.map((t) => {
                                            return (<Picker.Item key={t.id} label={t.time + " waiting " + t.wait_que} value={t.time} />);
                                        })}

                                    </Picker>
                                </Form>
                                
                            </Col>
                        </Row>
                        <Row>
                            <Col style={{ marginRight: 2, height: 100 }} >
                                <View style={styles.bottomButton} >
                                    <Thumbnail square small source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/mobile-mai-tong-ror.appspot.com/o/Thai-Baht-512.png?alt=media&token=0d4efb72-1b5e-4344-9f79-6bc01f381f98' }} />
                                    <Text style={{ fontSize: 30 }}> {this.state.price} Baht </Text>
                                </View>
                            </Col>
                            <Col onPress={this.createCollectionListOrder} style={{ height: 100 }}>
                                <View style={styles.bottomButton} >
                                    <Thumbnail square source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/mobile-mai-tong-ror.appspot.com/o/icons8-add-shopping-cart-100.png?alt=media&token=12795f67-0325-4651-89a6-834a6217d360' }} />

                                </View>
                            </Col>
                        </Row>
                        {console.log("user lisrorder", this.state.userListOrder)}
                        {console.log("resDetail : ", this.state.resDetail)}
                        {console.log("Menu : ", this.state.menus)}
                        {console.log("Option : ", this.state.option)}
                        {console.log("AllTime : ", this.state.AllTime)}
                        {console.log("Time Stramp : ", this.state.dateTime)}
                        {console.log("Time: ", this.state.time)}
                    </Grid>

                </Container>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    boxSmall: {
        width: 370,
        height: 120,
        marginBottom: 0,
        marginRight: 0,
        backgroundColor: 'skyblue',
    },
    boxSmallest: {
        width: 370,
        height: 80,
        marginBottom: 0,
        marginRight: 0,
        backgroundColor: 'green',
    },
    boxLarge: {
        width: 370,
        height: 200,
        marginBottom: 0,
        marginRight: 0,
        backgroundColor: 'steelblue',
    }, boxLarge2: {
        width: 370,
        height: 140,
        marginBottom: 0,
        marginRight: 0,
        backgroundColor: 'red',
    }, box: {
        width: 70,
        height: 100,
        marginBottom: 0,
        marginRight: 10,
        backgroundColor: 'blue',
    }, textEgg: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    }, bottomText: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'skyblue',
    }, textFont: {
        fontSize: 20,
    }, bottomButton: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: 'black',

    },
})

AppRegistry.registerComponent('App', () => App)
