import React,{useState, useEffect} from 'react';
import {StatusBar, Button, FlatList, StyleSheet, Text, View} from 'react-native';

const styles = StyleSheet.create({
   listStyle: {
      borderWidth: 1,
   },
});

let originalData = [];

const Home = ({navigation}) => {
  const [myData, setMyData] = useState([]);

    fetch("https://jsonhost.com/json/7d53c98dc62533e7860c021cb5b86237")
        .then((response) => {
            return response.json();
        })
        .then((myJson) => {
            if(originalData.length<1) {
                setMyData(myJson);
                originalData = myJson;
            }
        });

    useEffect(() => {
        fetch('https://jsonhost.com/json/7d53c98dc62533e7860c021cb5b86237')
            .then((response) => {
                return response.json();
            })
            .then((myJson) => {
                console.log(myJson);
                setMyData(myJson);
            })},
        []);

  const renderItem = ({item, index, section}) => {
    return (
    <View style={styles.listStyle}>
    <Text>{item.name}</Text>
    </View>
    );
  };

   return (
    <View>
      <StatusBar/>
	  <Button title='Add Item' onPress={
      ()=>{navigation.navigate("Add",{datastr:JSON.stringify(myData)})}}/>
      <FlatList data={myData} renderItem={renderItem}/>
    </View>
  );
};

export default Home;