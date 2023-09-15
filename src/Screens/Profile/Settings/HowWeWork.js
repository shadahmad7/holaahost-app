//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

// create a component
const HowWeWork = () => {
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
        Creation of Event
      </Text>
      <View
        style={{
          marginHorizontal: 10,
          paddingHorizontal: 10,
        }}>
        <Text style={{fontSize: 16, fontWeight: '400', marginVertical: 10}}>
          • An user can create an event. The user can choose from a list of
          fields while creating an event. The user who creates an event will be
          termed as an ‘Admin’. The Admin can describe the event details and add
          pictures of the event.
        </Text>
        <Text style={{fontSize: 16, fontWeight: '400', marginVertical: 10}}>
          • The Admin will have to pay event listing charge to the network
          ‘Holaahost’. The Admin can make the event free of charge for attendees
          or have event attendance fees. The Admin can make the event open for
          all or choose from the invites received who to accept for the event.
        </Text>
        <Text style={{fontSize: 16, fontWeight: '400', marginVertical: 10}}>
          • If the Admin makes the event charged, the attendees/invitees will
          have to pay the Admin directly via payment details listed on the event
          page.
        </Text>
        <Text style={{fontSize: 16, fontWeight: '400', marginVertical: 10}}>
          • The Admin can share the event listing and details on other websites
          like Facebook and Whatsapp.
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
        Joining an Event/Searching for Event
      </Text>
      <View
        style={{
          marginHorizontal: 10,
          paddingHorizontal: 10,
        }}>
        <Text style={{fontSize: 16, fontWeight: '400', marginVertical: 10}}>
          • The users of the network ‘Holaahost’ can search for the events through the search option.
        </Text>
        <Text style={{fontSize: 16, fontWeight: '400', marginVertical: 10}}>
          • If interested in an event, the users can send joining confirmation to the Admin of the event (the 
event might be free or have event attendance charges).
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
        Creation of Blog Group

      </Text>
      <View
        style={{
          marginHorizontal: 10,
          paddingHorizontal: 10,
        }}>
        <Text style={{fontSize: 16, fontWeight: '400', marginVertical: 10}}>
          • An user can create a Blog Group on the network. The creation of Blog Group is free. The user 
who created a blog group will be termed as an ‘Admin’.
        </Text>
        <Text style={{fontSize: 16, fontWeight: '400', marginVertical: 10}}>
          • The Admin can post blogs and media content on his/her blog group. The blog posts will have a 
discussion/group chat option below the post, where other users can comment or group chat.
        </Text>
        <Text style={{fontSize: 16, fontWeight: '400', marginVertical: 10}}>
          • The Admin of blog group will be eligible for royalty from network ‘Holaahost’ once reaching 
certain milestones/criteria regarding number of followers gained for his/her blog group. The 
details of the same is mentioned in the Terms and Conditions section.
        </Text>
        <Text style={{fontSize: 16, fontWeight: '400', marginVertical: 10}}>
          • The Admin can remove any of his/her follower for spamming or violation of network policies.
        </Text>
        <Text style={{fontSize: 16, fontWeight: '400', marginVertical: 10}}>
          • The Admin will earn batches as he/she gains followers.
        </Text>
       
      </View>
      {/* forth Section */}
      <Text
        style={{
          marginLeft: 20,
          marginTop: 10,
          fontSize: 18,
          fontWeight: '700',
        }}>
       Searching for Blog Groups

      </Text>
      <View
        style={{
          marginHorizontal: 10,
          paddingHorizontal: 10,
        }}>
        <Text style={{fontSize: 16, fontWeight: '400', marginVertical: 10}}>
          • The users of the network can search for blog groups from the search option.
        </Text>
        <Text style={{fontSize: 16, fontWeight: '400', marginVertical: 10}}>
          • The first three blogs of the Blog Groups and its discussion content are visible to all the users of 
the network.
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
       Joining a Blog Group

      </Text>
      <View
        style={{
          marginHorizontal: 10,
          paddingHorizontal: 10,
        }}>
        <Text style={{fontSize: 16, fontWeight: '400', marginVertical: 10}}>
          • An user of the network can join any blog group upon payment of nominal subscription fees, 
which makes the user eligible to interact on the blog discussion, see more blogs of the Blog 
Group and message other members of the blog groups.
        </Text>
        <Text style={{fontSize: 16, fontWeight: '400', marginVertical: 10}}>
          • The first three blogs of the Blog Group are visible to all and are free to view. For viewing further 
blogs/content of the Blog Group, the user needs to subscribe to the Blog Group.
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
       Messaging Members of Blog Group

      </Text>
      <View
        style={{
          marginHorizontal: 10,
          paddingHorizontal: 10,
        }}>
        <Text style={{fontSize: 16, fontWeight: '400', marginVertical: 10}}>
          • To message and interact with other members of blog groups, the user needs to subscribe to the 
Blog Group.
        </Text>
        <Text style={{fontSize: 16, fontWeight: '400', marginVertical: 10}}>
          • A member of blog group can block incoming message in his/her personal chats section for 
spamming or violation of network policies.
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
//make this component available to the app
export default HowWeWork;
