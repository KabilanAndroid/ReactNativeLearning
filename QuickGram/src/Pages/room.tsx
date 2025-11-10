import firestore from '@react-native-firebase/firestore';


const createTwoUserRoom = async (userId1:any, userId2: any ) => {
  try {
    const roomRef = await firestore()
      .collection('chatRooms')
      .add({
        users: [userId1, userId2].sort(),
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
    console.log('Room created with ID: ', roomRef.id);
    return roomRef.id;
  } catch (error) {
    console.error('Error creating room: ', error);
    throw error;
  }
};

export default createTwoUserRoom;
