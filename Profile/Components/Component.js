
import React from 'react';
import {
    ActivityIndicator,
    FlatList,
    Image,
    Text,
    View
} from 'react-native';

// import FontAwesome from 'react-native-vector-icons/FontAwesome'
// import Butto from '../../../components/Button';
import Button from '../../components/Button';
import Colors from '../../styles/Colors';

import { styles } from '../styles';

export const Loader = () => {
    return (
        <View style={styles.loaderContainer}>
            <ActivityIndicator
                size="large"
                color={'white'} />
        </View>
    )
}

export const ProfileSection = ({ profileImage, profileName, profileDesc, }) => {
    return (
        <>
            <View style={styles.profileContainer}>
                <Image
                    style={styles.profile}
                    resizeMode='contain'
                    source={{ uri: profileImage ? profileImage : "https://cdn-icons-png.flaticon.com/512/1053/1053244.png" }} />
            </View>
            <View style={styles.profileBioContainer}>
                <Text style={styles.name}>{profileName}</Text>
                <Text style={styles.subTitleText(10)}>{profileDesc?.substring(0, 175)}</Text>
            </View>
            <View style={styles.iconContainer}>
                {/* <FontAwesome
                    name='user-circle-o'
                    size={25}
                    color={Colors.white}
                    style={{ marginTop: '50%' }} /> */}
            </View>
        </>
    )
}

export const StatusSection = ({ profileFollower, profileFollowing, profilePost, }) => {
    return (
        <>
            <View style={styles.statusSubContainer}>
                <Text style={styles.titleText(18)}>{profileFollower}</Text>
                <Text style={styles.subTitleText(10)}>{'Followers'}</Text>

            </View>
            <View style={styles.statusSubContainer}>
                <Text style={styles.titleText(18)}>{profileFollowing}</Text>
                <Text style={styles.subTitleText(10)}>{'Following'}</Text>

            </View>
            <View style={styles.statusSubContainer}>
                <Text style={styles.titleText(18)}>{profilePost}</Text>
                <Text style={styles.subTitleText(10)}>{'No of Posts'}</Text>

            </View>

        </>
    )
}

export const InformationContainer = ({ profileFollower, profileFollowing, profilePost, navigation }) => {
    return (
        <>
            <View>
                <FlatList
                    data={['Current follow details', `Lost/Gained Followers`, `Total Post`]}
                    renderItem={({ item, index }) => {
                        return (
                            <>
                                <Text style={[styles.subTitleText(10), { marginVertical: 10 }]}>{item}</Text>
                                <View style={styles.listContainer}>
                                    {(index == 0 || index == 1) ?
                                        <>
                                            <View style={styles.cardContainer('48%', index, 'left')}>
                                                <Text style={styles.titleText(25)}>{index == 0 ? profileFollower : Math.floor(Math.random() * 10)}</Text>
                                                <Text style={styles.subTitleText(0, Colors.white)}>{index == 0 ? 'Followers' : index == 1 ? 'Lost' : ''}</Text>
                                            </View>
                                            <View style={styles.cardContainer('48%', index, 'right')}>
                                                <Text style={styles.titleText(25)}>{index == 0 ? profileFollowing : Math.floor(Math.random() * 100)}</Text>
                                                <Text style={styles.subTitleText(0, Colors.white)}>{index == 0 ? 'Following' : index == 1 ? 'Gained' : ''}</Text>
                                            </View>
                                        </>
                                        :
                                        <View style={styles.cardContainer('100%', index)}>
                                            <Text style={styles.titleText(25)}>{profilePost}</Text>
                                            <Text style={styles.subTitleText(0, Colors.white)}>{'Posts'}</Text>
                                        </View>
                                    }
                                </View>
                            </>
                        )
                    }}
                    keyExtractor={item => item.id}
                />
            </View>
            <Button
                callBack={() => { navigation.goBack() }}
                title={`Search Another User`}
                customStyle={styles.footerContainer}
                titleStyle={styles.footerText}
            />
        </>
    )
}

export const NoDataMessage = ({ loader, navigation }) => {
    return (
        <View>

            <Image
                source={{ uri: `https://streamnow.appswamy.com/assets/img/no-data-found.png` }}
                resizeMode='contain'
                blurRadius={loader && 5}
                style={{ height: "100%", width: "100%", }}
            />
            {!loader &&
                <Button
                    callBack={() => { navigation.goBack() }}
                    title={`Search Another User`}
                    customStyle={styles.footerContainer}
                    titleStyle={styles.footerText}
                />
            }
        </View>
    )
}