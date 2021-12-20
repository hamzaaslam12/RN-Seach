import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Platform,
    StyleSheet,
    StatusBar,
    Keyboard,
    TouchableWithoutFeedback,
    FlatList
} from 'react-native';


const SearchFilter = () => {

const [data, setData] = useState([])
const [filterData, setFilterData] = useState([])
const [searchText, setSearchText] = useState('')

const apiURL = 'https://jsonplaceholder.typicode.com/posts'

const fetchPosts = () => {
    fetch(apiURL)
    .then((response) => response.json())
    .then((responseJSON) => {
        setData(responseJSON)
        setFilterData(responseJSON)
    }).catch(err => console.error(err))
}

useEffect(() => {
    fetchPosts()
}, [])

const DisplayItem = ({item}) => {
    return(
        <Text style={{ padding: 17, fontSize: 17}}>
            {`${item.id}) ${item.title}`}
        </Text>
    )
    
}

const ItemSeprateView = () => {
    return(
        <View 
        style={{height: 0.5, width: '100%', backgroundColor: '#fff',}}
        />
    )
}

const searchFilter = (text) => {
    if(text){
        let newData = filterData.filter(item => {
            let oldItem = item.title ? item.title.toUpperCase() : ''.toUpperCase();
            let newItem = text.toUpperCase();
            return oldItem.indexOf(newItem) > -1;
        });
           setData(newData)
            setSearchText(text)
    
        } else {
            setData(data)
            setSearchText(text)

    }
}


    return(
    <View style={{flex: 1}}>
        <Text>HELLO WORLD!</Text>
        <TextInput
        value={searchText}
        onChangeText={(text) => searchFilter(text)}
        underlineColorAndroid='transparent'
        style={{width: '80%',height: 40,marginLeft: 'auto', marginRight: 'auto', borderColor: '#009688', borderWidth: 1, paddingLeft: 20}}
        placeholder='Search here'
        />

        <FlatList 
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={DisplayItem}
        ItemSeparatorComponent={ItemSeprateView}
        />
    </View>
    )    
}

export default SearchFilter;