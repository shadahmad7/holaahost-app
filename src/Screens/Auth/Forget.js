import {useNavigation} from '@react-navigation/native';
import {Text, ScrollView, View, StyleSheet} from 'react-native';
import SocialButton from '../../Components/SocialButton';
import colors from '../../constants/colors';
import imagePath from '../../constants/imagePath';
import React from 'react';
import FloatingLabelTextInput from '../../Components/FloatingLabelTextInput';
import Button from '../../Components/Button';
import Toast from 'react-native-simple-toast';
import {forgotPassword} from '../../actions/authAction';

export default function Forget() {
  const navigation = useNavigation();

  const [email,  setEmail] = React.useState('');
  const forgotPassFunc = async () => {

    if (email === '') {
      Toast.show("Email can't be empty", Toast.LONG);
    } else {
      let action = await forgotPassword(email);
      console.log('RESSSS', action);
      Toast.show('Password Reset link has been send', Toast.LONG);
      setTimeout(() => {
        navigation.navigate('Login');
      }, 2000);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Login using Email */}
        <FloatingLabelTextInput title="Email" secureTextEntry={false} onChangeText={(text) => setEmail(text)} />

        {/* Login using Email */}

        <Button
          title="Reset"
          style={[styles.loginButton, styles.loginButtonText]}
          onPress={() => forgotPassFunc()}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    // alignItems:'center',
    paddingVertical: 5,
  },

  loginButton: {
    backgroundColor: colors.primary,
    width: '90%',
    alignSelf: 'center',
    marginVertical: 10,
  },
  loginButtonText: {
    color: '#fff',
    alignItems: 'center',
  },
  loginAsButton: {
    borderColor: colors.secondary,
    borderWidth: 1,
    backgroundColor: 'transparent',
    width: '90%',
    alignSelf: 'center',
    marginVertical: 10,
  },
  loginAsButtonText: {
    color: colors.secondary,
    alignItems: 'center',
  },
});
