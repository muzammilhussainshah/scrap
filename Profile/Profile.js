// @app
import React, {
  useEffect,
  useState
} from 'react';
import {
  FlatList,
  Text,
  Button,
  Modal,
  TouchableOpacity,
  View,
} from 'react-native';

import axios from 'axios';

import { styles } from './styles';
import {
  Loader,
  NoDataMessage,
} from './Components/Component';
import cheerio from 'react-native-cheerio';

const CustomModal = ({ isVisible, courseDetail, onClose }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <View style={{ backgroundColor: 'white', height: '100%', paddingTop: 60, width: '100%', borderRadius: 10 }}>
          <Button title="Close" onPress={onClose} />
          <FlatList
            data={courseDetail}
            renderItem={({ item, index }) => {
              return (
                <>
                  {index == 0 &&
                    <View key={index} style={[styles.row, { backgroundColor: index % 2 === 0 ? '#f5f5f5' : null }]}>
                      <View style={styles.column}>
                        <Text style={[styles.columnText, { fontWeight: '700' }]}>{`Instructor Name`}</Text>
                      </View>
                      <View style={styles.column}>
                        <TouchableOpacity>
                          <Text style={[styles.columnText, { fontWeight: '700' }]}>{`Section`}</Text>
                        </TouchableOpacity>
                      </View>
                    </View>}
                  <View key={index} style={[styles.row, { backgroundColor: index % 2 === 0 ? '#f5f5f5' : null }]}>
                    <View style={styles.column}>
                      <Text style={styles.columnText}>{item['instructorName']}</Text>
                    </View>
                    <View style={styles.column}>
                      <Text style={styles.columnText}>{item['section']}</Text>
                    </View>
                  </View>
                </>
              )
            }}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
    </Modal>
  );
};

// export default CustomModal;



const Profile = ({ route, navigation }) => {

  const [profileInfo, setProfileInfo] = useState(`No Data Found`)
  const [courseDetail, setcourseDetail] = useState(`No Data Found`)
  const [loader, setloader] = useState(false)
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => { getInstaInfo() }, [])


  const openModal = (courseName) => {
    getCourseDetail(courseName)
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const getCourseDetail = (courseName) => {
    const newURL = `https://www.lsa.umich.edu/cg/cg_results.aspx?termArray=f_23_2460&cgtype=ug&department=${courseName}&allsections=true&show=40`
    // const newURL = `https://www.lsa.umich.edu/cg/cg_results.aspx?termArray=f_23_2460&cgtype=ug&department=AAS&allsections=true&show=40&iPageNum=2`
    try {
      setloader(true)
      var config = {
        method: 'get',
        url: newURL,
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
      };

      axios(config)
        .then(function (response) {

          const htmlContent = response.data;
          const $ = cheerio.load(htmlContent);
          // Use Cheerio selectors to extract the data you need
          const titles = [];
          $('a[href^="mailto"]')
            .each((index, element) => {
              const href = $(element).attr('href');
              const email = href.replace('mailto:', '').trim();
              const text = $(element).text().trim();
              titles.push(text);
            });

          const sectionarr = []
          $('div.row.bottompadding_main')
            .each((index, element) => {
              const section = $(element)[0].children[1].children[0].data
              const cleanTitle = section.replace(/\n|\t/g, '').trim(); // Remove line breaks (\n), tabs (\t), and trim extra spaces
              sectionarr.push(cleanTitle);
            });
          const mergedArray = titles.map((instructorName, index) => ({
            instructorName,
            section: sectionarr[index + 1],
          }));
          setcourseDetail(mergedArray)
          setloader(false)

        })
        .catch(function (error) {
          setloader(false)
          console.log(error, 'error')
        });
    }
    catch (err) {
      setloader(false)
      console.log(err, 'error')
    }
  }


  function getInstaInfo() {
    try {
      setloader(true)
      var config = {
        method: 'get',
        url: `https://www.lsa.umich.edu/cg/cg_subjectlist.aspx?termArray=f_23_2460&cgtype=ug&allsections=true`,
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
      };

      axios(config)
        .then(function (response) {
          const htmlContent = response.data;
          const $ = cheerio.load(htmlContent);
          // Use Cheerio selectors to extract the data you need
          const titles = [];
          $('td').each((index, element) => {
            const title = $(element).text().trim(); // Remove leading and trailing whitespace
            const cleanTitle = title.replace(/\n/g, ''); // Remove line breaks (\n)
            titles.push(cleanTitle);
          });
          // Create an array of objects with Subject Code and Description properties
          const data = [];
          for (let i = 0; i < titles.length; i += 2) {
            const subjectCode = titles[i];
            const description = titles[i + 1];
            data.push({ "Subject Code": subjectCode, "Description": description });
          }
          // Do something with the extracted data
          setProfileInfo(data)
          setloader(false)
        })
        .catch(function (error) {
          console.log(error, 'err profileData')

          setProfileInfo('No Data Found')
          setloader(false)
        });
    }
    catch (err) {
      console.log(err, 'err profileData')
      setloader(false)
      setProfileInfo('No Data Found')
    }
  }

  return (
    <View style={styles.container}>

      {loader && <Loader />}
      <CustomModal courseDetail={courseDetail} isVisible={modalVisible} onClose={closeModal} />

      {profileInfo !== 'No Data Found' ?
        <FlatList
          data={profileInfo}
          renderItem={({ item, index }) => {
            return (
              <View key={index} style={[styles.row, { backgroundColor: index % 2 === 0 ? '#f5f5f5' : null }]}>
                <View style={styles.column}>
                  <TouchableOpacity onPress={() => openModal(item['Subject Code'])}>
                    <Text style={styles.columnText}>{item['Subject Code']}</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.column}>
                  <TouchableOpacity onPress={() => openModal(item['Subject Code'])}>
                    <Text style={styles.columnText}>{item['Description']}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )
          }}
          keyExtractor={(item, index) => index.toString()}
        />
        :
        <NoDataMessage loader={loader} navigation={navigation} />
      }
    </View>
  );
};
export default Profile;
