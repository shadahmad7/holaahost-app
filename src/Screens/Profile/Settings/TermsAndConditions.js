//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';




const data = [
    { followers: 250, royalty: "$5", achievement: "Yellow" },
    { followers: 500, royalty: "$10", achievement: "Blue" },
    { followers: 1000, royalty: "$25", achievement: "Green" },
    { followers: 2500, royalty: "$50", achievement: "Red" }
    ];
    
// create a component
const TermsAndConditions = () => {
    return (
        <View style={styles.container}>
    <ScrollView>

      <Text
        style={{
          marginLeft: 20,
          marginTop: 10,
          fontSize: 18,
          fontWeight: '700',
        }}>
        Introduction to Business
      </Text>
      <View
        style={{
          marginHorizontal: 10,
          paddingHorizontal: 10,
        }}>
        <Text style={{fontSize: 16, fontWeight: '400', marginVertical: 10}}>
          • “Holaahost” is a proprietary of ‘Holahost Pvt Ltd’. The aim of the network is to host events, 
attend events and use of blogging networking features.
        </Text>
        <Text style={{fontSize: 16, fontWeight: '400', marginVertical: 10}}>
          • All the intellectual property, copyrights and trademarks of the website and apps is retained by 
‘Holahost Pvt Ltd’.
        </Text>
        <Text style={{fontSize: 16, fontWeight: '400', marginVertical: 10}}>
          • The users of network “Holaahost” agree to the policies of the network which are mentioned in 
detail in next section.
        </Text>
        
      </View>

      {/* Second Section */}
      <Text
        style={{
          marginLeft: 20,
          marginTop: 10,
          fontSize: 18,
          fontWeight: '700',
        }}>
        Policies
      </Text>
      <View
        style={{
          marginHorizontal: 10,
          paddingHorizontal: 10,
        }}>
        <Text style={{fontSize: 16, fontWeight: '400', marginVertical: 10}}>
          • The user must be above 18 years of age to use the network.
        </Text>
        <Text style={{fontSize: 16, fontWeight: '400', marginVertical: 10}}>
          • The user can post/host events, attend events, create blog groups, join blog groups, interact with 
users of blog groups and message users in blog groups.
        </Text>
        <Text style={{fontSize: 16, fontWeight: '400', marginVertical: 10}}>
          • The content/discussion of blog groups is open to all subjects except vulgar content, sensitive 
content to any community or any threatening content.
        </Text>
        <Text style={{fontSize: 16, fontWeight: '400', marginVertical: 10}}>
          • Any offensive, illegal and vulgar content on the website/apps if found, will be removed.
        </Text>
        <Text style={{fontSize: 16, fontWeight: '400', marginVertical: 10}}>
          • For hosting/attending events, the admin/attendees are at sole discretion and responsibility.
        </Text>
        <Text style={{fontSize: 16, fontWeight: '400', marginVertical: 10}}>
          • Use of alcohol and theme in events is at liability of admin. The admin of the event is responsible 
for legal clauses in regard with the state policies.
        </Text>
        <Text style={{fontSize: 16, fontWeight: '400', marginVertical: 10}}>
          • Use of drugs in events is prohibited. The admin/members are requested to not use any illegal 
substance in the events. If found guilty, the admin of the event is solely responsible for the legal 
clauses.
        </Text>
        <Text style={{fontSize: 16, fontWeight: '400', marginVertical: 10}}>
          • Users can report any person, event or blog group. The network “Holaahost” has rights to 
terminate/remove/block any offensive, illegal or vulgar content/user.
        </Text>
       
      </View>
      {/* third Section */}
      <Text
        style={{
          marginLeft: 20,
          marginTop: 10,
          fontSize: 18,
          fontWeight: '700',
        }}>
        Royalty and Achievements

      </Text>
      <View
        style={{
          marginHorizontal: 10,
          paddingHorizontal: 10,
        }}>
        <Text style={{fontSize: 16, fontWeight: '400', marginVertical: 10}}>
          • Blog group admin will be eligible for royalty once reached a minimum amount of followers (one 
time during first attempt).
        </Text>
        <Text style={{fontSize: 16, fontWeight: '400', marginVertical: 10}}>
          • The royalty to be paid is as follows. The further bar of royalty to be paid will be updated soon.
        </Text>

       {/* table */}

       <View style={styles2.headerContainer}>
      <View style={styles2.headerColumn}>
        <Text style={styles2.headerText}>Followers Gained</Text>
      </View>
      <View style={styles2.headerColumn}>
        <Text style={styles2.headerText}>Royalty Earned</Text>
      </View>
      <View style={styles2.headerColumn}>
        <Text style={styles2.headerText}>Achievement</Text>
      </View>
    </View>
    {
      data.map((item, index) => (
        <View style={styles2.dataContainer} key={index}>
          <View style={styles2.dataColumn}>
            <Text style={styles2.dataText}>{item.followers}</Text>
          </View>
          <View style={styles2.dataColumn}>
            <Text style={styles2.dataText}>{item.royalty}</Text>
          </View>
          <View style={styles2.dataColumn}>
            <Text style={styles2.dataText}>{item.achievement}</Text>
          </View>
        </View>
      ))
    }
       {/* table */}
       
      </View>
      {/* forth Section */}
      <Text
        style={{
          marginLeft: 20,
          marginTop: 10,
          fontSize: 18,
          fontWeight: '700',
        }}>
        Payments and refund policy

      </Text>
      <View
        style={{
          marginHorizontal: 10,
          paddingHorizontal: 10,
        }}>
        <Text style={{fontSize: 16, fontWeight: '400', marginVertical: 10}}>
          • The payment for using the features of website/apps of “Holaahost” goes to ‘Holahost Pvt Ltd’.
        </Text>
        <Text style={{fontSize: 16, fontWeight: '400', marginVertical: 10}}>
          • If an event is charged by the admin, the payment goes to the admin of the event. ‘Holahost Pvt 
Ltd’ has no share in such charged events. Any dispute regarding payment in such cases is to be 
settled with the admin of the event. If any fraud/dispute occurs in such regard, the user has right 
to report it to “Holaahost” management team.
        </Text>
      
        <Text style={{fontSize: 16, fontWeight: '400', marginVertical: 10}}>
          • The ‘royalty’ will be paid to the admin of blog groups on reaching certain milestone. ‘Holahost 
Pvt Ltd’ will pay the royalty to the admin of blog groups on reaching the milestones. Details of 
the royalty earned can be found in above section. The royalty will be paid directly to the bank 
account of the admin after the admin fills up the banking transaction details.
        </Text>
      
        <Text style={{fontSize: 16, fontWeight: '400', marginVertical: 10}}>
          • If there is technical failure/issues for payments to Holaahost, it will be resolved and refunded by 
automated banking gateways
        </Text>
      
       
      </View>
      {/* fifth Section */}
      <Text
        style={{
          marginLeft: 20,
          marginTop: 10,
          fontSize: 18,
          fontWeight: '700',
        }}>
        Privacy policy

      </Text>
      <View
        style={{
          marginHorizontal: 10,
          paddingHorizontal: 10,
        }}>
        <Text style={{fontSize: 16, fontWeight: '400', marginVertical: 10}}>
          • Content the user posts on website is visible to users of the website and apps. Some of the 
basic data of the website may be visible off the platform as well.
        </Text>
        <Text style={{fontSize: 16, fontWeight: '400', marginVertical: 10}}>
          • The content about ‘Events’ section can be shared on other networking websites like Whatsapp, 
Facebook.
        </Text>
      
        <Text style={{fontSize: 16, fontWeight: '400', marginVertical: 10}}>
          • ‘Holahost Pvt Ltd’ can collect information from “Holaahost” for data purposes. This data if 
collected will/can be stored by ‘Holahost Pvt Ltd’ safely and not be shared with other platforms/
companies except advertising purposes.
        </Text>
      
        <Text style={{fontSize: 16, fontWeight: '400', marginVertical: 10}}>
          • The data collected by ‘Holahost Pvt Ltd’ may be used for analytics purposes and for third party 
programs like advertising purposes.
        </Text>
      
       
      </View>
      {/* Sixth Section */}
      <Text
        style={{
          marginLeft: 20,
          marginTop: 10,
          fontSize: 18,
          fontWeight: '700',
        }}>
        Cookies policy

      </Text>
      <View
        style={{
          marginHorizontal: 10,
          paddingHorizontal: 10,
        }}>
        <Text style={{fontSize: 16, fontWeight: '400', marginVertical: 10}}>
          • The cookies policy of “Holaahost” will comply with the cookies policy of respective states.
        </Text>
        <Text style={{fontSize: 16, fontWeight: '400', marginVertical: 10}}>
          • Cookies improve the experience of the user on the website by remembering users preference 
and enable other cookies based feature like analytics.
        </Text>
      
        <Text style={{fontSize: 16, fontWeight: '400', marginVertical: 10}}>
          • ‘Holahost Pvt Ltd’ may use cookies of the website and trusted third parties like Google 
Analytics for improvement of functionalities the website.
        </Text>
      
        <Text style={{fontSize: 16, fontWeight: '400', marginVertical: 10}}>
          • ‘Holahost Pvt Ltd’ may update the policies from time to time for functionality and user security 
of the website. It is advisable to read the policies from time to time.
        </Text>
      
       
      </View>
  
     
      </ScrollView>

    </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        // backgroundColor: '#2c3e50',
    },
});


const styles2 = StyleSheet.create({
    container: {
    flex: 1
    },
    headerContainer: {
    flexDirection: 'row',
    backgroundColor: '#f7f7f7'
    },
    headerColumn: {
    flex: 1,
    padding: 10
    },
    headerText: {
    fontWeight: 'bold'
    },
    dataContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#f7f7f7'
    },
    dataColumn: {
    flex: 1,
    padding: 10
    },
    dataText: {
    fontSize: 14
    }
    });

//make this component available to the app
export default TermsAndConditions;
