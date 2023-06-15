import { StyleSheet } from 'react-native';
// import Colors from '../../styles/Colors';
import Colors from '../styles/Colors';
export const styles = StyleSheet.create({

    // const styles = StyleSheet.create({
    // container: {
    //   flex: 1,
    //   padding: 16,
    // },
    row: {
        flexDirection: 'row',
        // marginBottom: 8,
    },
    column: {
        flex: 1,
        padding: 8,
        // height: 50,
        justifyContent: "center",
        // alignItems: 'center',
        // borderWidth: 1,
        // borderTopWidth:1,
        borderBottomWidth:1,
        borderColor: '#000000',
    },
    columnText: {
        // color: Colors.white,
        fontSize: 16,
    },
    //   });

    container: { flex: 1, paddingTop: 60, paddingHorizontal: 10 },

    cardContainer: (width, index, position) => ({ height: 100, width: width, justifyContent: "center", alignItems: 'center', borderRadius: 10, backgroundColor: position == 'left' ? index == 0 ? Colors.orange : index == 1 ? Colors.red : Colors.tabActive : index == 0 ? Colors.purple : index == 1 ? Colors.green : Colors.tabActive, }),

    titleText: (size) => ({ color: Colors.white, fontSize: size, fontWeight: 'bold' }),

    subTitleText: (margin, color) => ({ color: color ? color : Colors.tabInactive, marginHorizontal: margin, fontSize: 13, fontWeight: '600' }),

    listContainer: { height: 100, width: "100%", flexDirection: 'row', justifyContent: "space-between" },

    name: { color: Colors.white, marginHorizontal: 10, fontSize: 16, fontWeight: '600' },

    iconContainer: { flex: 1, marginTop: '15%', alignItems: "center" },

    statusContainer: { flex: 1, flexDirection: 'row', borderTopWidth: 1, borderTopColor: Colors.tabInactive, borderBottomWidth: 1, borderBottomColor: Colors.tabInactive },

    statusSubContainer: { flex: 1, alignItems: "center", justifyContent: "center" },

    profile: { height: 66, width: 66, borderRadius: 33, },

    profileContainer: { flex: 2, marginTop: '15%', justifyContent: "center", alignItems: "center" },

    profileSection: { flex: 2, flexDirection: 'row' },

    profileBioContainer: { flex: 7, marginTop: '15%', justifyContent: "center", },

    footerContainer: { height: 50, alignSelf: "center", width: '100%', backgroundColor: Colors.pink, justifyContent: 'center', alignItems: 'center', borderRadius: 10, position: 'absolute', bottom: 50 },

    footerText: { color: Colors.white },

    loaderContainer: { position: "absolute", zIndex: 2, padding: 30, borderRadius: 10, alignSelf: "center", top: '45%', backgroundColor: 'rgba(0,0,0,0.8)' },

});