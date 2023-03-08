import {StyleSheet} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

export const gradients = ['#fff', '#E4F9E9'];

export const globalstyles = StyleSheet.create({
  logocontainer: {
    justifyContent: 'center',
    alignItems: 'center',
    top: responsiveHeight(15),
    // height: responsiveHeight(25),
    // width: responsiveWidth(10),
  },
  input: {
    height: responsiveHeight(4.8),
    width: responsiveWidth(80),
    borderRadius: 10,
    // backgroundColor: '#f5fcf7',
    color: 'black',
    marginTop: responsiveHeight(2),
    borderWidth: 2,

    borderColor: 'lightgrey',
  },
  image: {
    width: responsiveWidth(25),
  },
  bckimg: {
    // position: 'absolute',
    // flex: 1,
    justifyContent: 'flex-end',
  },
  text: {
    color: 'black',
    fontSize: responsiveFontSize(4),
    fontWeight: 'bold',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    height: responsiveHeight(4.2),
    width: responsiveWidth(80),
    backgroundColor: '#338B47',
    borderRadius: 10,
    marginTop: responsiveHeight(1.5),
  },
  linecontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: responsiveHeight(1),
  },
  line: {
    // flex: 1,
    height: 1,
    backgroundColor: 'black',
    paddingHorizontal: responsiveWidth(13),
  },
  buttontext: {
    fontSize: responsiveFontSize(2.5),
    color: 'white',
    fontWeight: 'bold',
  },
  alert: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 5,
    alignItems: 'center',
    width: responsiveWidth(50),
  },
  alertTitle: {
    fontSize: responsiveFontSize(3),
    fontWeight: 'bold',
    marginBottom: 5,
    // color: '#3b0911'
    color: '#7a1f2c',
  },
  successalertTitle: {
    fontSize: responsiveFontSize(3),
    fontWeight: 'bold',
    marginBottom: 5,
    // color: '#3b0911'
    color: '#338B47',
  },
  alertMessage: {
    fontSize: responsiveFontSize(2),
    marginBottom: 10,
    textAlign: 'center',
    color: 'black',
  },
  alertButton: {
    backgroundColor: '#E4F9E9',
    padding: 10,
    paddingLeft: 15,
    borderRadius: 5,
  },
  alertButtonText: {
    color: 'black',
    fontSize: responsiveFontSize(1.9),
  },
  smallcontainer: {
    paddingLeft: 10,
    // alignItems: 'center',
    justifyContent: 'center',
    marginTop: responsiveHeight(2),
    height: responsiveHeight(30),
    width: responsiveWidth(80),
    backgroundColor: '#fff',
    borderRadius: 18,
    elevation: 15,
    // shadowColor: '#555555',
    shadowColor: '#338B47',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  //edit profile screen
  upbckimg: {
    width: responsiveWidth(100),
    height: responsiveHeight(25),
    // resizeMode: 'contain',
    // borderRadius: 50,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  imageContainer: {
    borderRadius: 80,
    width: 160,
    height: 160,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ccc',
    top: responsiveHeight(-9),
  },
  profileimage: {
    top: responsiveHeight(1),
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 100,
  },
  upercontainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputcontainer: {
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
    top: responsiveHeight(-7),
  },
  name: {
    // backgroundColor: 'green',
    color: 'black',
    fontSize: responsiveFontSize(4),
    fontWeight: 'bold',
  },
});
