import React from 'react';
import { View } from 'react-native';
import Routes from './src/Navigation/Routes';
import { StripeProvider } from '@stripe/stripe-react-native';


const App = () => {

  return (
    <View style={{ flex: 1 }}>
    <StripeProvider  publishableKey='pk_test_51KUlB7SEouvAhYsQro6csEGnf5JQRbkmh7Rh8jQgllAb2cq4ECWWAVxj7IYvwyAoIiXX9cHubRTdab07sCRF33mD00eRtyxTc6'>
      <Routes />
    </StripeProvider>
    </View>
  );
};

export default App;
