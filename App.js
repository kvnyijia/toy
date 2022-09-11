/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, { useEffect, useState } from 'react';
 import { 
  ActivityIndicator, 
  Button,
  FlatList, 
  SafeAreaView,
  StyleSheet,
  Text, 
  View 
} from 'react-native';
 
 export default App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [shouldShow, setShouldShow] = useState(true);
  const [justifyContent, setJustifyContent] = useState("flex-start");

  const getMovies = async () => {
    try {
      const response = await fetch('https://gentle-badlands-93828.herokuapp.com/getMovie');
      const json = await response.json();
      setData(json.movies);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
    <View style={styles.container} selectedValue={justifyContent} setSelectedValue={setJustifyContent}>

      {isLoading ? <ActivityIndicator/> : !shouldShow ? null : (
        <FlatList 
          style={styles.title}
          data={data}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <Text>{item.title}, {item.releaseYear}</Text>
          )}
        />
      )}

      <Button
        style={styles.button}
        title="Press me"
        onPress={() => setShouldShow(!shouldShow)}
      />

    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-around',
    margin: 10,
  },
  title: {
    // textAlign: 'center',
    // marginHorizontal: 100,
    marginVertical: 250,
    paddingBottom: 0,
    marginBottom: 0
  },
  button: {
    // textAlign: 'center',
    // marginHorizontal: 100,
    alignItems: 'center',
    paddingVertical: 0,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});