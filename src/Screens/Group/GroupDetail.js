//import liraries
import React, {useState, Component, useRef} from 'react';
import {
  View,
  Share,
  Text,
  StyleSheet,
  Image,
  TextInput,
  ImageBackground,
  Alert,
  Button,
  Pressable,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import colors from '../../constants/colors';
import OverviewCard from '../../Components/OverviewCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  addBookmark,
  getAllRelatedGroups,
  getGroupById,
  removeBookmark,
} from '../../actions/groupAction';
import {becomeMember, getAllMembers, leaveGroupByUser, removeMember} from '../../actions/memberAction';
import {api} from '../../config/api';
import {createBlog, getAllBlogs} from '../../actions/blogsAction';
import {
  addComment,
  addCommentReply,
  deleteComment,
  getAllComments,
  likeComment,
  unlikeComment,
  updateComment,
  updateCommentReply,
} from '../../actions/discussionAction';
import moment from 'moment/moment';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { HtmlText } from "@e-mine/react-native-html-text";
 
import DocumentPicker from 'react-native-document-picker';
import { RichEditor, RichToolbar } from 'react-native-pell-rich-editor';


const comments = [
  {
    id: 1,
    author: 'User 1',
    text: 'This is a comment',
    likeCount: 2,
    replies: [
      {
        id: 2,
        author: 'User 2',
        text: 'This is a reply',
        likeCount: 2,
      },
    ],
  },
  {
    id: 3,
    author: 'User 3',
    likeCount: 2,
    text: 'This is another comment',
    replies: [],
  },
];

// create a component
let active = 'Info';
let groupId = 0;
let optiions = ['Info', 'Members', 'Blogs', 'Discussions'];
const GroupDetail = props => {
  //Group Details
  const [id, setId] = React.useState(0);
  const [groupDetail, setGroupDetail] = React.useState('');
  const [saved, setSaved] = React.useState(false);
  const [relatedGroups, setRelatedGroups] = React.useState([]);
const navigation = useNavigation();
  //Members
  const [membersData, setMembersData] = React.useState([]);

  //Blogs
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [media, setMedia] = useState(null);
  const [blogsData, setBlogsData] = React.useState([]);
  const [editorContent, setEditorContent] = useState('');
  const editorRef = useRef(null);

  //Comment
  const [newComment, setNewComment] = useState('');
  const [addingComment, setAddingComment] = useState(false);
  const [commentsData, setCommentsData] = useState([]);

  //Loaders & Flags
  const [logged, setLogged] = useState(false);
  const [user, setUser] = useState(0);
  const [loader, setLoader] = React.useState(false);
  const [mainLoader, setMainLoader] = React.useState(false);

  const addCommentt = async () => {
    setLoader(true);
    let addCommentRess = await addComment(newComment, groupId);
    console.log(`Adding comment: ${addCommentRess}`);
    let discussionsRes = await getAllComments(groupId);
    discussionsRes = discussionsRes.data;
    setCommentsData([...discussionsRes]);
    console.log('comments new', discussionsRes);
    setTimeout(() => {
      setLoader(false);
    }, 2000);
    setNewComment('');
  };
  const onLike = id => {
    // Add logic to like a comment here
    console.log(`Liking comment with id: ${id}`);
  };

  const onReply = id => {
    // Add logic to reply to a comment here
    console.log(`Replying to comment with id: ${id}`);
  };

  React.useEffect(() => {
    loadAll();
  }, []);

  const loadAll = async () => {
    setLoader(true);
    setMainLoader(true);
    console.log('hereeeee', props.route.params.groupId);
    console.log('hereeeee', props.route.params.groupTitle);
    setId(props.route.params.groupId);
    groupId = props.route.params.groupId;
    console.log('hereeeee', id);
    let a = await AsyncStorage.getItem('@user');
    console.log('userr', a);
    if (a) {
      a = JSON.parse(a);
      setLogged(true);
      setUser(a.id);
    }

    let getGroupByIdRes = await getGroupById(groupId);
    console.log("hereeee", getGroupByIdRes)
    getGroupByIdRes = await getGroupByIdRes?.data;
    setGroupDetail(getGroupByIdRes);

    if (getGroupByIdRes?.is_saved) {
      setSaved(true);
    }

    let blogsRes = await getAllBlogs(groupId);
    blogsRes = blogsRes.data.data;
    setBlogsData([...blogsRes]);
    console.log('blogsss', blogsRes);

    let membersRes = await getAllMembers(groupId);
    membersRes = membersRes.data.data;
    setMembersData([...membersRes]);

    console.log('AAAAAAAAAA', membersRes);

    let discussionsRes = await getAllComments(groupId);
    discussionsRes = discussionsRes.data;
    setCommentsData([...discussionsRes]);
    console.log('comments new', discussionsRes);

    let relatedGroupsRes = await getAllRelatedGroups(
      getGroupByIdRes?.id,
      getGroupByIdRes?.group_category_id,
    );

    console.log('RELATED', relatedGroupsRes);
    setRelatedGroups(relatedGroupsRes.data.data);

    setTimeout(() => {
      setLoader(false);
      setMainLoader(false);
    }, 4000);
  };

  const pickImage = async () => {
   
      const options = {
        mediaType: 'mixed',
        quality: 1,
        maxWidth: 500,
        maxHeight: 500,
      };
      try {
        const file = await DocumentPicker.pick({
          type: [DocumentPicker.types.allFiles],
        });
        console.log('thrthtr  thhtrth th', file);
        setMedia(file)

      } catch (err) {
        console.log('Error choosing media', err);
      }
  };








  const handleAdd = async() => {
setLoader(true);
      const editorContent = await editorRef.current?.getContentHtml();
      setEditorContent(editorContent);
  
   console.log("heeereee", editorContent, title, media);
   
   let imagee = {uri:media[0].uri, type: media[0].type, name:media[0].name }
   let createBlogRes= await createBlog(groupId, editorContent, title, imagee);
   console.log("hereee ress", createBlogRes);

   let blogsRes = await getAllBlogs(groupId);
    blogsRes = blogsRes.data.data;
    setBlogsData([...blogsRes]);
    console.log('blogsss', blogsRes);

    setTimeout(() => {
      setLoader(false);
    }, 2000);
  };







  const saveGroup = async () => {
    let saveGroupRes = await addBookmark(groupDetail?.id);
    console.log('save', saveGroupRes);
    setMainLoader(true);
    let getGroupByIdRes = await getGroupById(groupId);
    getGroupByIdRes = await getGroupByIdRes.data;
    setGroupDetail(getGroupByIdRes);
    setSaved(true);
    setTimeout(() => {
      setMainLoader(false);
    }, 2000);
  };

  const unsaveGroup = async () => {
    let unsaveGroupRes = await removeBookmark(groupDetail?.id);
    console.log('unsave', unsaveGroupRes);
    setMainLoader(true);
    let getGroupByIdRes = await getGroupById(groupId);
    getGroupByIdRes = await getGroupByIdRes.data;
    setGroupDetail(getGroupByIdRes);
    setSaved(false);
    setTimeout(() => {
      setMainLoader(false);
    }, 2000);
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `Checkout this amazing group! https://holaahost.com/group/${groupDetail?.id}`,
        // url: `https://holaahost.web.app/group/${groupDetail?.id}`,
        // title: 'save and share',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const onLoaddAll = async () => {
    let discussionsRes = await getAllComments(groupId);
    discussionsRes = discussionsRes.data;
    setCommentsData([...discussionsRes]);
    console.log('comments new', discussionsRes);
  };

  function Comment({comment}) {
    const [selectedCommentIndex, setSelectedCommentIndex] = useState(null);
    const [selectedCommentReplyIndex, setSelectedCommentReplyIndex] =
      useState(null);
    const [text, setText] = useState('');
    const [liked, setLiked] = useState(false);
    // const [loader, setLoader] = useState(false);
    // const [commentsData, setCommentsData] = useState([]);
    const [selectedCommentEditIndex, setSelectedCommentEditIndex] =
      useState(false);
    const [commentt, setCommentt] = useState(false);

    const handleCancel = () => {
      setText('');
      setSelectedCommentReplyIndex(null);
    };

    const handleOk = async id => {
      setLoader(true);
      console.log('Entered text:', text);
      let addCommentReplyyRes = await addCommentReply(id, text, groupId);
      console.log('hereeee', addCommentReplyyRes);
      setText('');
      setSelectedCommentReplyIndex(null);
      let discussionsRes = await getAllComments(groupId);
      discussionsRes = discussionsRes.data;
      setCommentsData([...discussionsRes]);
      setTimeout(() => {
        setLoader(false);
      }, 2000);
    };
    const handleCommentPress = index => {
      if (selectedCommentIndex) {
        setSelectedCommentIndex(null);
      } else {
        setSelectedCommentIndex(index);
      }
    };

    const onLike = async (id, isLike) => {
      setLoader(true);
      if (isLike != null) {
        let unlikeeRes = await unlikeComment(id);
        console.log('heeere', unlikeeRes);
      } else {
        let likeeRes = await likeComment(id);
        console.log('heeere', likeeRes);
      }
      let discussionsRes = await getAllComments(groupId);
      discussionsRes = discussionsRes.data;
      setCommentsData([...discussionsRes]);
      setTimeout(() => {
        setLoader(false);
      }, 2000);
    };

    const handleCommentReplyPress = index => {
      if (selectedCommentReplyIndex) {
        setSelectedCommentReplyIndex(null);
      } else {
        setSelectedCommentReplyIndex(index);
      }
    };

    const onEditComment = (comment, index) => {
      console.log('cccccc', comment, index);
      setSelectedCommentIndex(null);
      setText(comment);
      setSelectedCommentEditIndex(index);
      setCommentt(true);
    };

    const onUpdateComment = async id => {
      setLoader(true);
      let updateCommetRes = await updateComment(id, text, groupId);
      console.log('updateCommetRes', updateCommetRes);
      setText('');
      let discussionsRes = await getAllComments(groupId);
      discussionsRes = discussionsRes.data;
      setCommentsData([...discussionsRes]);
      setSelectedCommentEditIndex(null);
      setCommentt(false);
      onLoaddAll();
      setTimeout(() => {
        setLoader(false);
      }, 2000);
    };

    const handleEditCancel = () => {
      setCommentt(false);
      setSelectedCommentEditIndex(null);
    };

    const deleteCom = async id => {
      setLoader(true);
      let delteREssss = await deleteComment(id);
      console.log('JJJJJJJJJJ'.delteREssss);

      let discussionsRes = await getAllComments(groupId);
      discussionsRes = discussionsRes.data;
      setCommentsData([...discussionsRes]);
      setTimeout(() => {
        setLoader(false);
      }, 2000);
    };

    return (
      <View style={{marginHorizontal: -20}}>
        <View style={styles.commentContainer}>
          <Image
            source={{
              uri: api.imageUrl + comment?.users?.photoUrl,
            }}
            style={{width: 40, borderRadius: 40, height: 40}}
          />
          <View style={styles.header}>
            <View>
              <View
                style={{
                  alignItems: 'center',
                  width: '100%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text style={styles.dateLabel}>
                  {moment(comment?.created_at).format('lll')}
                </Text>
                <Icon
                  name="more-horizontal"
                  size={18}
                  color={colors.primary}
                  solid
                  style={{paddingLeft: 5, paddingVertical: 10}}
                  onPress={() => handleCommentPress(comment.id)}
                />
                {selectedCommentIndex && (
                  <View
                    style={{
                      paddingHorizontal: 20,
                      backgroundColor: '#fff',
                      position: 'absolute',
                      top: 25,
                      right: 45,
                      zIndex: 10,
                      paddingVertical: 10,
                      borderRadius: 5,
                      borderWidth: 0.5,
                    }}>
                    {comment?.users?.id === user ? (
                      <>
                        <Text
                          style={{marginVertical: 3}}
                          onPress={() => deleteCom()}>
                          Delete Comment
                        </Text>
                        <Text
                          style={{marginVertical: 3}}
                          onPress={() =>
                            onEditComment(comment.comment, comment.id)
                          }>
                          Edit Comment
                        </Text>
                      </>
                    ) : (
                      <>
                        <Text
                          style={{marginVertical: 3}}
                          onPress={() => handleCommentReplyPress(comment.id)}>
                          Reply
                        </Text>
                        <Text style={{marginVertical: 3}}>Report</Text>
                      </>
                    )}
                  </View>
                )}
              </View>

              <View>
                <Text style={styles.author}>{comment?.users?.name}</Text>
              </View>
            </View>

            {/* edit reply */}

            {selectedCommentEditIndex ? (
              commentt ? (
                <View style={styles5.container}>
                  <TextInput
                    style={styles5.input}
                    placeholder="Type something..."
                    value={text}
                    onChangeText={text => setText(text)}
                  />
                  <View style={styles5.buttonContainer}>
                    <TouchableOpacity
                      style={styles5.cancelButton}
                      onPress={handleEditCancel}>
                      <Text style={styles5.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles5.okButton}
                      onPress={() => onUpdateComment(comment.id)}>
                      <Text style={styles5.buttonText}>Update</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : null
            ) : (
              <Text style={styles.text}>{comment.comment}</Text>
            )}
            {/* edit reply */}

            <View
              style={{
                flexDirection: 'row',
                marginVertical: 5,
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() => onLike(comment.id, comment.is_likes)}
                style={{
                  width: 40,
                  paddingHorizontal: 5,
                  alignItems: 'center',
                  marginVertical: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                  paddingVertical: 5,
                  borderRadius: 5,
                  borderWidth: 0.3,
                  // backgroundColor: colors.primary,
                }}>
                <FontAwesome5Icon
                  name="heart"
                  size={12}
                  color={colors.primary}
                  solid={comment.is_likes === null ? false : true}
                  light={comment.is_likes === null ? true : false}
                />
                <Text style={{fontSize: 10, marginLeft: 4, color: '#000'}}>
                  {comment?.likes_count}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleCommentReplyPress(comment.id)}
                style={{
                  width: 50,
                  marginLeft: 5,
                  paddingHorizontal: 5,
                  alignItems: 'center',
                  marginVertical: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                  paddingVertical: 5,
                  borderRadius: 5,
                  borderWidth: 0.3,
                  // backgroundColor: colors.primary,
                }}>
                <FontAwesome5Icon
                  name="reply"
                  size={12}
                  color={colors.primary}
                  light
                />
                <Text style={{fontSize: 10, marginLeft: 4, color: '#000'}}>
                  Reply
                </Text>
              </TouchableOpacity>
            </View>

            {/* enter reply */}

            {selectedCommentReplyIndex && (
              <View style={styles5.container}>
                <TextInput
                  style={styles5.input}
                  placeholder="Type something..."
                  value={text}
                  onChangeText={text => setText(text)}
                />
                <View style={styles5.buttonContainer}>
                  <TouchableOpacity
                    style={styles5.cancelButton}
                    onPress={handleCancel}>
                    <Text style={styles5.buttonText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles5.okButton}
                    onPress={() => handleOk(comment.id)}>
                    <Text style={styles5.buttonText}>OK</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            {/* enter reply */}
          </View>
        </View>
        <View style={{alignSelf: 'flex-end'}}>
          {comment.replies.map(reply => (
            <Reply reply={reply} key={reply.id} />
          ))}
        </View>
      </View>
    );
  }

  // REPLY
  // REPLY
  // REPLY
  // REPLY
  // REPLY

  function Reply({reply}) {
    const [selectedCommentIndex, setSelectedCommentIndex] = useState(null);
    const [selectedCommentReplyIndex, setSelectedCommentReplyIndex] =
      useState(null);
    const [selectedReplyEditIndex, setSelectedReplyEditIndex] = useState(null);
    const [text, setText] = useState('');
    const [liked, setLiked] = useState(false);
    // const [loader, setLoader] = useState(false);

    // const [commentsData, setCommentsData] = useState([]);
    const [replyy, setReplyy] = useState(false);

    React.useEffect(() => {
      loadDataa();
    }, []);

    const loadDataa = () => {
      console.log('AAAAAAAAAAAAAAAAA', reply);
    };

    const onLike = async (id, isLike) => {
      setLoader(true);
      if (isLike != null) {
        let unlikeeRes = await unlikeComment(id);
        console.log('heeere', unlikeeRes);
      } else {
        let likeeRes = await likeComment(id);
        console.log('heeere', likeeRes);
      }
      let discussionsRes = await getAllComments(groupId);
      discussionsRes = discussionsRes.data;
      setCommentsData([...discussionsRes]);
      setTimeout(() => {
        setLoader(false);
      }, 2000);
    };

    const handleCancel = () => {
      setText('');
      setSelectedCommentReplyIndex(null);
    };

    const handleOk = async id => {
      setLoader(true);
      console.log('Entered text:', text);
      let addCommentReplyyRes = await addCommentReply(id, text, groupId);
      console.log('hereeee', addCommentReplyyRes);
      setText('');
      setSelectedCommentReplyIndex(null);

      let discussionsRes = await getAllComments(groupId);
      discussionsRes = discussionsRes.data;
      setCommentsData([...discussionsRes]);
      onLoaddAll();
      setTimeout(() => {
        setLoader(true);
      }, 2000);
      setLoader(false);
    };
    const handleCommentPress = index => {
      if (selectedCommentIndex) {
        setSelectedCommentIndex(null);
      } else {
        setSelectedCommentIndex(index);
      }
    };

    const onEditComment = (comment, index) => {
      console.log('cccccc', comment, index);
      setSelectedCommentIndex(null);
      setText(comment);
      setSelectedReplyEditIndex(index);
      setReplyy(true);
    };

    const handleEditCancel = () => {
      setReplyy(false);
      setSelectedReplyEditIndex(null);
    };

    const onReply = id => {
      if (selectedCommentIndex) {
        setSelectedCommentIndex(null);
      } else {
        setSelectedCommentIndex(index);
      }
    };

    const handleCommentReplyPress = index => {
      if (selectedCommentReplyIndex) {
        setSelectedCommentReplyIndex(null);
      } else {
        setSelectedCommentReplyIndex(index);
      }
    };

    const onUpdateReplyy = async id => {
      setLoader(true);
      let updateCommetReplyRes = await updateCommentReply(id, text, groupId);
      console.log('updateCommetReplyRes', updateCommetReplyRes);
      setText('');
      let discussionsRes = await getAllComments(groupId);
      discussionsRes = discussionsRes.data;
      setCommentsData([...discussionsRes]);
      setSelectedReplyEditIndex(null);
      setReplyy(false);

      setTimeout(() => {
        setLoader(false);
      }, 2000);
    };

    const deleteCom = async id => {
      setLoader(true);
      let delteComRes = await deleteComment(id);
      console.log('JJJJJJJJJJ'.delteComRes);
      let discussionsRes = await getAllComments(groupId);
      discussionsRes = discussionsRes.data;
      setCommentsData([...discussionsRes]);
      setTimeout(() => {
        setLoader(false);
      }, 2000);
    };



  
    

    return (
      <View style={styles.replyContainer}>
        <Image
          source={{
            uri: api.imageUrl + reply?.users?.photoUrl,
          }}
          style={{width: 40, borderRadius: 40, height: 40}}
        />
        <View style={styles.header}>
          <View>
            <View
              style={{
                alignItems: 'center',
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={styles.dateLabel}>
                {moment(reply?.created_at).format('lll')}
              </Text>
              <Icon
                name="more-horizontal"
                size={18}
                color={colors.primary}
                style={{paddingLeft: 5, paddingVertical: 10}}
                onPress={() => handleCommentPress(reply.id)}
              />
            </View>

            {selectedCommentIndex && (
              <View
                style={{
                  paddingHorizontal: 20,
                  backgroundColor: '#fff',
                  position: 'absolute',
                  top: 25,
                  right: -5,
                  zIndex: 10,
                  paddingVertical: 10,
                  borderRadius: 5,
                  borderWidth: 0.5,
                }}>
                {reply?.users?.id === user ? (
                  <>
                    <Text
                      style={{marginVertical: 3}}
                      onPress={() => deleteCom(reply.id)}>
                      Delete Comment
                    </Text>
                    <Text
                      style={{marginVertical: 3}}
                      onPress={() => onEditComment(reply.comment, reply.id)}>
                      Edit Reply
                    </Text>
                  </>
                ) : (
                  <>
                    <Text style={{marginVertical: 3}}>Reply</Text>
                    <Text style={{marginVertical: 3}}>Report</Text>
                  </>
                )}
              </View>
            )}

            <View>
              <Text style={styles.author}>{reply?.users?.name}</Text>
            </View>
          </View>

          {/* edit reply */}

          {selectedReplyEditIndex ? (
            replyy ? (
              <View style={styles5.container}>
                <TextInput
                  style={styles5.input}
                  placeholder="Type something..."
                  value={text}
                  onChangeText={text => setText(text)}
                />
                <View style={styles5.buttonContainer}>
                  <TouchableOpacity
                    style={styles5.cancelButton}
                    onPress={handleEditCancel}>
                    <Text style={styles5.buttonText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles5.okButton}
                    onPress={() => onUpdateReplyy(reply.id)}>
                    <Text style={styles5.buttonText}>Update</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : null
          ) : (
            <Text style={styles.text}>{reply.comment}</Text>
          )}
          {/* edit reply */}

          <View
            style={{
              flexDirection: 'row',
              marginVertical: 5,
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => onLike(reply.id, reply.is_likes)}
              style={{
                width: 40,
                paddingHorizontal: 5,
                alignItems: 'center',
                marginVertical: 5,
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                paddingVertical: 5,
                borderRadius: 5,
                borderWidth: 0.3,
              }}>
              <FontAwesome5Icon
                name="heart"
                size={12}
                color={colors.primary}
                solid={reply.is_likes === null ? false : true}
                light={reply.is_likes === null ? true : false}
              />
              <Text style={{fontSize: 10, marginLeft: 4, color: '#000'}}>
                {reply.likes_count}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleCommentReplyPress(reply.id)}
              style={{
                width: 50,
                marginLeft: 5,
                paddingHorizontal: 2,
                alignItems: 'center',
                marginVertical: 5,
                // paddingHorizontal:20,
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                paddingVertical: 5,
                borderRadius: 5,
                borderWidth: 0.3,
                // backgroundColor: colors.primary,
              }}>
              <FontAwesome5Icon name="reply" size={12} color={colors.primary} />
              <Text style={{fontSize: 10, marginLeft: 4, color: '#000'}}>
                Reply
              </Text>
            </TouchableOpacity>
          </View>

          {/* enter reply */}
          {selectedCommentReplyIndex && (
            <View style={styles5.container}>
              <TextInput
                style={styles5.input}
                placeholder="Type something..."
                value={text}
                onChangeText={text => setText(text)}
              />
              <View style={styles5.buttonContainer}>
                <TouchableOpacity
                  style={styles5.cancelButton}
                  onPress={handleCancel}>
                  <Text style={styles5.buttonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles5.okButton}
                  onPress={() => handleOk(reply.parent_comment_id)}>
                  <Text style={styles5.buttonText}>OK</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          {/* enter reply */}
        </View>
      </View>
    );
  }








const joinGroup = async()=> {
  let a = await AsyncStorage.getItem("@user");
  await AsyncStorage.setItem("@joinGroup", JSON.stringify(groupId));
  if(a){

navigation.navigate("Make Payment")
  } else{
    navigation.replace("Login")

  }
  // let becomeMemberResss = await becomeMember(groupId);
  // console.log("joineddd", becomeMemberResss)
}




const leaveGroup = async()=> {
  let notMemberResss = await leaveGroupByUser(groupDetail?.is_member);
  console.log("joineddd", notMemberResss)
}



const handleInsertImage = async() => {
  try {
    const file = await DocumentPicker.pick({
      type: [DocumentPicker.types.allFiles],
    });
    console.log('AAAAAAAAAAAAAAQQQQQQQQQQQQQQQQQQQ', file);

  } catch (err) {
    console.log('Error choosing media', err);
  }
};

const redirectToChat = async(res)=> {
  await AsyncStorage.setItem("@chatUser", JSON.stringify(res));
 navigation.navigate("MessageStack");
}




const memberRemove = async (id) => {
  setLoader(true);
  console.log("hiiiiiiiii,", id, groupId)
  let removeMemberRes = await removeMember(id, groupId);
  console.log("removed member", removeMemberRes);
  let membersRes = await getAllMembers(groupId);
    membersRes = membersRes.data.data;
    setMembersData([...membersRes]);
    console.log('herteee', membersRes);
    setTimeout(()=> {
      setLoader(false)
    },2000)
};








  return (
    <>
      {!mainLoader ? (
        <View style={styles.container}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{flexGrow: 1}}>
            <Image
              source={{
                uri: api.imageUrl + groupDetail?.group_image,
              }}
              style={{
                width: '100%',

                height: 200,
              }}
            />

            {/* Card */}
            <View
              style={{
                width: '80%',
                alignSelf: 'center',
                height: 160,
                paddingHorizontal: 20,
                borderRadius: 10,
                borderWidth: 0.3,
                paddingVertical: 10,
                marginTop: -90,
                backgroundColor: '#fff',
              }}>
              <Text
                style={{fontSize: 24, fontWeight: '700', marginVertical: 2}}>
                {groupDetail?.group_name}
              </Text>
              <Text
                style={{fontSize: 14, fontWeight: '500', marginVertical: 2}}>
                Managed by {groupDetail?.admin}
              </Text>
              <Text
                style={{fontSize: 14, fontWeight: '500', marginVertical: 2}}>
                {groupDetail?.group_location}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 10,
                  justifyContent: 'space-between',
                }}>

{groupDetail.group_user_id != user && (
  <>
                {groupDetail?.is_member === null ? (
                  <TouchableOpacity
                  onPress={()=> joinGroup()}
                    style={{
                      paddingHorizontal: 10,
                      borderRadius: 5,
                      backgroundColor: colors.primary,
                      paddingVertical: 10,
                    }}>
                    <Text style={{color: '#fff'}}>Join Group for ₹15</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                   onPress={()=> leaveGroup()}
                    style={{
                      paddingHorizontal: 10,
                      borderRadius: 5,
                      backgroundColor: 'red',
                      paddingVertical: 10,
                    }}>
                    <Text style={{color: '#fff'}}>Leave Group</Text>
                  </TouchableOpacity>
                )}
                </>
)}
               
              

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <FontAwesome5Icon
                    name="bookmark"
                    color="#444"
                    size={18}
                    solid={saved}
                    light={!saved}
                    style={{marginRight: 10}}
                    onPress={() => (saved ? unsaveGroup() : saveGroup())}
                  />
                  <TouchableOpacity
                    onPress={() => onShare()}
                    style={{
                      paddingHorizontal: 6,
                      borderRadius: 5,
                      backgroundColor: colors.secondary,
                      paddingVertical: 6,
                    }}>
                    <Text
                      onPress={() => onShare()}
                      style={{color: '#fff', fontSize: 12}}>
                      Share
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            {/* Card */}

            {/* Main Oprions */}
            <View style={{marginTop: 10, flex: 1, height: '100%'}}>
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  {optiions.map((opt, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        (active = opt),
                          setLoader(true),
                          console.log('admkld', active),
                          setTimeout(() => {
                            setLoader(false);
                          }, 2000);
                      }}
                      style={{
                        marginRight: 5,
                        borderRadius: 5,
                        borderWidth: active != opt ? 1 : 0,
                        backgroundColor:
                          active === opt ? colors.secondary : '#fff',
                        paddingHorizontal: active != opt ? 11 : 12,
                        paddingVertical: active != opt ? 5 : 6,
                      }}>
                      <Text style={{color: active === opt ? '#fff' : '#000'}}>
                        {opt}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
              {/* Main Oprions */}

              {/* Main Contetn */}
              {!loader ? (
                <View
                  style={{
                    flex: 1,
                    paddingTop: 10,
                    height: '100%',
                  }}>
                  {/* Info */}
                  {active === 'Info' && (
                    <View
                      style={{
                        marginTop: 10,
                        width: Dimensions.get('window').width,
                        paddingHorizontal: 20,
                      }}>
                      <Text
                        style={{
                          color: '#000',
                          fontWeight: '500',
                          fontSize: 20,
                        }}>
                        What we're about
                      </Text>
                      <Text>{groupDetail?.data?.group_description}</Text>

                      <View style={{marginTop: 10}}>
                        <Text
                          style={{
                            color: '#000',
                            fontWeight: '500',
                            fontSize: 20,
                          }}>
                          Responses
                        </Text>
                      </View>

                      <TextInput
                        style={styles.input}
                        value={newComment}
                        onChangeText={setNewComment}
                        placeholder="Add a comment"
                      />
                      <TouchableOpacity
                        style={styles.button}
                        onPress={addCommentt}>
                        <Text style={{color: '#fff', fontSize: 11}}>Add</Text>
                      </TouchableOpacity>

                      {comments.length === 0 && (
                        <View
                          style={{alignItems: 'center', marginVertical: 20}}>
                          <Text>No comments found</Text>
                        </View>
                      )}

                      <View style={styles.containerr}>
                        {commentsData.slice(0, 2).map(comment => (
                          <Comment comment={comment} key={comment.id} />
                        ))}
                      </View>
                    </View>
                  )}
                  {/* Info */}

                  {/* Members */}
                  {active === 'Members' && (
                    <View
                      style={{
                        marginTop: 10,
                        width: Dimensions.get('window').width,
                        paddingHorizontal: 20,
                      }}>
                      <Text
                        style={{
                          color: '#000',
                          fontWeight: '500',
                          fontSize: 20,
                        }}>
                        Members
                      </Text>
                      {membersData.length === 0 && (
                        <View
                          style={{alignItems: 'center', marginVertical: 20}}>
                          <Text>No groups found</Text>
                        </View>
                      )}
                      {membersData.filter(member => member.id != user).map(member => (
                        <TouchableOpacity
                          key={member.id}
                          style={styles2.cardContainer}>
                          <Image
                            source={{uri: api.imageUrl + member.photoUrl}}
                            style={styles2.image}
                          />
                          <View style={styles2.textContainer}>
                            <Text style={styles2.name}>{member.name}</Text>
                            {member.id === groupDetail?.group_user_id && (
                              <Text style={styles2.adminLabel}>Admin</Text>
                            )}
                          </View>
                          <TouchableOpacity style={styles2.button} onPress={()=> redirectToChat(member.name)}>
                            <Text style={styles2.buttonText}>Chat</Text>
                          </TouchableOpacity>
                          {groupDetail?.group_user_id === user && ( 
                          <TouchableOpacity style={[styles2.button, {marginLeft:5, backgroundColor:"red"}]} onPress={()=> memberRemove(member?.gr_member_id)}>
                            <Text style={styles2.buttonText}>Remove</Text>
                          </TouchableOpacity>
                          )}
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                  {/* Members */}

                  {/* Blogs */}
                  {active === 'Blogs' && (
                    <View
                      style={{
                        marginTop: 10,
                        width: Dimensions.get('window').width,
                        paddingHorizontal: 20,
                      }}>
                      <Text
                        style={{
                          color: '#000',
                          fontWeight: '500',
                          fontSize: 20,
                        }}>
                        Write Blog
                      </Text>

                      <TextInput
                        style={styles4.input}
                        placeholder="Enter blog title"
                        value={title}
                        onChangeText={setTitle}
                      />
   <View style={{ flex: 1 }}>
   <RichEditor
        ref={editorRef}
        placeholder="Type something..."
      
      />

      <RichToolbar
        editor={editorRef}
        actions={[
          'bold',
          'italic',
          'underline',
          'strikethrough',
          'orderedList',
          'unorderedList',
          'code',
          'image',
        ]}
        iconTint="#000000"
        selectedIconTint="#2095F2"
        onPressAddImage={handleInsertImage}
      />
    </View>


                      <View style={styles4.buttons}>
                        <View style={{alignSelf: 'center'}}>
                          <TouchableOpacity
                            onPress={pickImage}
                            style={{
                              paddingHorizontal: 10,
                              borderRadius: 5,
                              backgroundColor: colors.secondary,
                              paddingVertical: 10,
                            }}>
                            <Text style={{color: '#fff'}}>Choose Media</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                      {media && (
                        <Text style={{marginVertical:10}}>{media[0].name}</Text>
                      )}
                      <TouchableOpacity
                        onPress={handleAdd}
                        style={{
                          paddingHorizontal: 10,
                          borderWidth: 0.4,
                          borderRadius: 5,
                          backgroundColor: colors.primary,
                          marginVertical: 10,
                          alignItems: 'center',
                          paddingVertical: 10,
                        }}>
                        <Text style={{color: '#fff'}}>Create</Text>
                      </TouchableOpacity>
                      

                      <Text
                        style={{
                          color: '#000',
                          fontWeight: '500',
                          fontSize: 20,
                        }}>
                        Blogs
                      </Text>

                      {blogsData.length === 0 && (
                        <View
                          style={{alignItems: 'center', marginVertical: 20}}>
                          <Text>No blogs found</Text>
                        </View>
                      )}

                      {blogsData.map((blog, index) => (
                        <View style={styles3.card} key={index} onTouchEnd={()=> navigation.navigate("BlogDetail",{
                      blogId: blog?.id,
                        })}>
                          <Text>{moment(blog.created_at).format('lll')}</Text>
                          <Text style={styles3.title}>{blog.blog_title}</Text>
                          <View style={styles3.fadeOut}>
                            <Text style={styles3.description}>
                            <HtmlText>{blog.blog_desc}</HtmlText> 
                            </Text>
                          </View>
                          <Text>By Admin</Text>
                        </View>
                      ))}
                    </View>
                  )}

                  {/* Blogs */}
                  {/* Discussions */}
                  {active === 'Discussions' && (
                    <View
                      style={{
                        marginTop: 10,
                        width: Dimensions.get('window').width,
                        paddingHorizontal: 20,
                      }}>
                      <View style={{marginTop: 10}}>
                        <Text
                          style={{
                            color: '#000',
                            fontWeight: '500',
                            fontSize: 20,
                          }}>
                          Discussions
                        </Text>
                      </View>

                      <TextInput
                        style={styles.input}
                        value={newComment}
                        onChangeText={setNewComment}
                        placeholder="Add a comment"
                      />
                      <TouchableOpacity
                        style={styles.button}
                        onPress={addComment}>
                        <Text style={{color: '#fff', fontSize: 11}}>Add</Text>
                      </TouchableOpacity>

                      {comments.length === 0 && (
                        <View
                          style={{alignItems: 'center', marginVertical: 20}}>
                          <Text>No comments found</Text>
                        </View>
                      )}

                      <View style={styles.containerr}>
                        {commentsData.slice(0, 10).map(comment => (
                          <Comment comment={comment} key={comment.id} />
                        ))}
                      </View>
                    </View>
                  )}

                  {/* Discussions */}

                  <View
                    style={{
                      marginTop: 10,
                      width: '90%',
                      alignSelf: 'center',
                      marginHorizontal: 20,
                    }}>
                    <Text
                      style={{
                        color: '#000',
                        marginLeft: 20,
                        textAlign: 'left',
                        marginVertical: 10,
                        fontWeight: '500',
                        fontSize: 20,
                      }}>
                      Related groups
                    </Text>
                  </View>
                  <View style={{marginHorizontal: 20}}>
                    {relatedGroups.length === 0 && (
                      <View style={{alignItems: 'center', marginVertical: 20}}>
                        <Text>No groups found</Text>
                      </View>
                    )}
                    <ScrollView
                      horizontal={true}
                      showsVerticalScrollIndicator={false}
                      showsHorizontalScrollIndicator={false}
                      contentContainerStyle={styles.scroll}>
                      {relatedGroups.map((card, index) => (
                        <Pressable
                          onPress={() =>
                            navigation.navigate('GroupDetail', {
                              groupId: card.id,
                              groupTitle: card.group_name,
                            })
                          }>
                          <OverviewCard
                            key={index}
                            image={card.group_image}
                            name={card.group_name}
                            members={card.members_count}
                            comments={card.comments_count}
                            location={card.group_location}
                          />
                        </Pressable>
                      ))}
                    </ScrollView>
                  </View>
                </View>
              ) : (
                <View
                  style={{
                    flex: 1,
                    width: Dimensions.get('window').width,
                    alignItems: 'center',
                    marginTop: '30%',
                  }}>
                  <ActivityIndicator size="large" color={colors.secondary} />
                </View>
              )}

              {/* Main Contetn */}
            </View>
          </ScrollView>
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            width: Dimensions.get('window').width,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ActivityIndicator size="large" color={colors.secondary} />
        </View>
      )}
    </>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#2c3e50',
  },
  scroll: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  containerr: {
    // padding: 16,
  },
  commentContainer: {
    marginTop: 10,
    flexDirection: 'row',
    padding: 16,
    borderRadius: 4,
    backgroundColor: '#f2f2f2',
  },
  replyContainer: {
    marginTop: 10,
    flexDirection: 'row',
    padding: 16,
    marginLeft: 40,

    borderRadius: 4,
    backgroundColor: '#f2f2f2',
  },
  dateLabel: {
    fontWeight: '400',
    marginBottom: 8,
  },
  author: {
    fontWeight: '700',
    marginBottom: 18,
  },
  text: {
    fontSize: 14,
  },
  input: {
    marginTop: 16,
    padding: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ccc',
    fontSize: 14,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    margin: 5,
    width: 60,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
  header: {
    // flexDirection: 'row',
    width: '80%',
    marginLeft: 5,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 5,
    //  justifyContent: 'flex-start',
    alignItems: 'flex-start',
    borderWidth: 0.3,
    padding: 10,
  },
});

const styles2 = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderWidth: 0.3,
    borderRadius: 10,
    marginVertical: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 20,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  adminLabel: {
    fontSize: 12,
    color: 'red',
    marginTop: 5,
  },
  button: {
    backgroundColor: colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

const styles3 = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
    marginVertical: 8,
    alignSelf: 'center',
    width: '90%',
    height:200,
    paddingVertical:10,
    overflow:'hidden',
    padding: 23,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  fadeOut:{
marginBottom:20,
paddingBottom:20
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  image: {
    width: '100%',
    height: 120,
    marginVertical: 8,
    resizeMode: 'cover',
  },

  description: {
    color: '#626262',
    marginVertical: 8,
  },
});

const styles4 = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    height: 40,
    alignSelf: 'center',
    borderRadius: 10,
    marginVertical: 10,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
   
  },
});

const styles5 = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    width: '80%',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  cancelButton: {
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  okButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default GroupDetail;
