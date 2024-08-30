import React, { useEffect, useState } from 'react';
import { Container, Box, TextField, Button, Typography, Avatar, Paper, IconButton, Tooltip } from '@mui/material';
import { styled } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { createPost, getPostsByTaskId, createComment, deleteComment, deletePost } from '../../../JS/actions/CommunicartionSpace';
import DashboardCard from 'src/components/shared/DashboardCard';
import PageContainer from 'src/components/container/PageContainer';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { FcAddImage } from "react-icons/fc";
import { FcEmptyTrash } from "react-icons/fc";
import { AiFillFilePdf } from "react-icons/ai";
import { formatDistanceToNow } from 'date-fns';
import { FcDownload } from "react-icons/fc";
import {url} from "../../../ConnectionString"


const ContainerStyled = styled(Container)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const TextFieldContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  marginBottom: theme.spacing(2),
  backgroundColor: 'white',
}));

const IconImageStyle = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: '70%',
  transform: 'translateY(-50%)',
  right: theme.spacing(1),
  color: "#a0a0a0",
}));


const IconImageStyled = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: '70%',
  transform: 'translateY(-50%)',
  right: theme.spacing(4),
  color: "#a0a0a0",
}));

const AvatarInsideTextField = styled(Avatar)(({ theme }) => ({
  position: 'absolute',
  top: '40%',
  transform: 'translateY(-50%)',
  left: theme.spacing(2),
}));

const TextFieldStyled = styled(TextField)(({ theme }) => ({
  paddingLeft: theme.spacing(8),
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      border: 'none',
    },
    '&:hover fieldset': {
      border: 'none',
    },
    '&.Mui-focused fieldset': {
      border: 'none',
    },
  },
}));

const PostButtonStyled = styled(Button)(({ theme }) => ({
  alignSelf: 'flex-end',
}));




const PaperStyled = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: '#f0f0f0',
  flexGrow: 1,
}));

const AvatarStyled = styled(Avatar)(({ theme }) => ({
  marginRight: theme.spacing(2),
  alignSelf: 'flex-start',
  marginTop: theme.spacing(4),
}));

const CommentAvatarstyled = styled(Avatar)(({ theme }) => ({
  marginRight: theme.spacing(2),
  alignSelf: 'flex-start',
  width: '30px',
  height: '30px',
  marginTop: theme.spacing(2),
}));

const ImagePreviewContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  maxWidth: '100%',
  maxHeight: '200px', 
  overflow: 'hidden',
  marginTop: theme.spacing(3),
}));

const ImagePreview = styled('img')(({ theme }) => ({
  maxWidth: '100%',
  maxHeight: '200px',
}));

const PostWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  width: '100%',
  marginTop: theme.spacing(5),
  marginBottom:theme.spacing(4),
}));

const CommentWrapper = styled(Box)(({ theme }) => ({
  marginLeft: theme.spacing(4),
  marginTop: theme.spacing(1),
}));

const CommentItemWrapper = styled(Box)(({ theme }) => ({
 
  marginTop: theme.spacing(1),
}));

const CommentInputWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginTop: theme.spacing(1),
}));

const CommentTextFieldStyled = styled(TextField)(({ theme }) => ({
  flexGrow: 1,
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      border: 'none',
    },
    '&:hover fieldset': {
      border: 'none',
    },
    '&.Mui-focused fieldset': {
      border: 'none',
    },
  },
}));

const DeleteIconButton = styled(IconButton)(({ theme }) => ({
  marginLeft: theme.spacing(1),
  padding: theme.spacing(0.5),
  fontSize: 'small',
}));

// Main PostSpace component
const PostSpace = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.user);
  const userId = user?._id;
  const posts = useSelector((state) => state.communicationReducer.posts);

  const [postText, setPostText] = useState('');
  const [images, setImages] = useState([]); // State to hold uploaded images
  const [commentText, setCommentText] = useState('');
  const [currentPostId, setCurrentPostId] = useState('');
  const { taskId } = useParams();


  //DELTE POST 

  const handleDeletePost = (postId, taskId) => {
    dispatch(deletePost(postId));
  };


  const handleDownloadPDF = (pdfFilePath) => {
    const filename = pdfFilePath.split('\\').pop().split('/').pop();
    const link = document.createElement('a');
    link.href = `${url}/pdf/${encodeURIComponent(filename)}`;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  
  useEffect(() => {
    dispatch(getPostsByTaskId(taskId));
  }, [dispatch, taskId]);

  // Function to upload images to Cloudinary
  const uploadImageToCloudinary = async (files) => {
    const cloudinaryUrl = 'https://api.cloudinary.com/v1_1/dxououehj/upload';
    const cloudinaryPreset = 'siwarse';

    const uploadedImages = [];

    try {
      for (const file of files) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', cloudinaryPreset);

        const response = await fetch(cloudinaryUrl, {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();
        uploadedImages.push(data.secure_url);
      }

      return uploadedImages;
    } catch (error) {
      console.error('Error uploading image to Cloudinary: ', error);
      return [];
    }
  };

  // State for managing current image index for each post
  const [currentImageIndex, setCurrentImageIndex] = useState({});

  // Function to handle next image in slider
  const handleNextImage = (postId) => {
    setCurrentImageIndex((prevState) => ({
      ...prevState,
      [postId]: (prevState[postId] || 0) + 1,
    }));
  };

  // Function to handle previous image in slider
  const handlePrevImage = (postId) => {
    setCurrentImageIndex((prevState) => ({
      ...prevState,
      [postId]: (prevState[postId] || 0) - 1,
    }));
  };

  const [pdf, setPDF] = useState(null); 

  const handlePDFChange = (e) => {
    const file = e.target.files[0];
    // console.log('Selected PDF file:', file);
    setPDF(file);
  };

  const handlePost = async () => {
    const posterId = user?._id;
  
    let uploadedImages = [];
  
    // Upload images to Cloudinary
    if (images.length > 0) {
      uploadedImages = await uploadImageToCloudinary(images);
    }
  
    dispatch(createPost(taskId, posterId, postText, uploadedImages, pdf))
      .then(() => {
        setPostText('');
        setImages([]);
        setPDF(null);
        // toast.success("Post created successfully");
      })
      .catch((error) => {
        console.error('Error creating post: ', error);
        // toast.error("Error creating post");
      });
  };
  

  const handleComment = (postId) => {
    const commenterId = user?._id;
    dispatch(createComment(postId, commenterId, commentText));
    setCommentText('');
    setCurrentPostId(postId);
  };

  const handleKeyPress = (event, postId) => {
    if (event.key === 'Enter') {
      handleComment(postId);
    }
  };

  // Function to handle deletion of comments
  const handleDeleteComment = (postId, commentId) => {
    dispatch(deleteComment(postId, commentId));
  };

  // Function to handle image selection/change
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  return (
    <PageContainer title="Communication Space" description="This is the communication space">
      <DashboardCard>
    

        <ContainerStyled maxWidth="sm">

          <TextFieldContainer style={{ border: "1px solid lightgray", borderRadius: "10px" }}>
            <AvatarInsideTextField
              alt={user?.firstName}
              src={user?.profilePicture}
            />
            <TextFieldStyled
              placeholder="Share your thoughts..."
              variant="outlined"
              multiline
              fullWidth
              rows={2}
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
            />
                <Tooltip title='add image'>

               <IconImageStyle>
      <label htmlFor="upload-image">
        <FcAddImage />
      </label>
      <input
        id="upload-image"
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleImageChange}
        multiple
      />
    </IconImageStyle></Tooltip>
    <Tooltip title='add pdf'>

    <IconImageStyled>

  <label htmlFor="upload-pdf">
    
    <AiFillFilePdf style={{ marginRight: "10px",color:"rgb(154, 201, 227)" }} />
  </label>
  <input
    id="upload-pdf"
    type="file"
    accept=".pdf"
    style={{ display: 'none' }}
    onChange={handlePDFChange}
  /></IconImageStyled></Tooltip>

          </TextFieldContainer>
          {  images.map((image, index) => (
            <ImagePreview key={index} src={URL.createObjectURL(image)} alt={`Image ${index}`} />
          ))}
          <PostButtonStyled variant="contained" color="primary" onClick={handlePost}>
            Post
          </PostButtonStyled>
          {Object.values(posts).map((post) => (
            <PostWrapper key={post?._id}>
              <AvatarStyled
                alt={post?.poster?.firstName}
                src={post?.poster?.profilePicture}
              />
              <Box>
                <Typography mb={1} variant="body2" color="textSecondary">
                  {post?.poster?.firstName}
                  <span style={{ float: 'right',fontSize:"13px",color:"gray",marginLeft:"25px"}}>        
                {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
            </span>
                </Typography>
                {post.postText && (
        <PaperStyled>
          
          <Typography variant="body1">
        

            {post?.postText} 
          </Typography>
          
        </PaperStyled>
        
      )}
      <Tooltip title="delete post">
      <DeleteIconButton aria-label="delete" onClick={() => handleDeletePost(post._id)}
           style={{ float: 'right'}} >
                          <FcEmptyTrash style={{ fontSize: "20px", color: "#5d87ff",}} />
                        </DeleteIconButton></Tooltip>

                {post.pdf && (
                  <>
                    <Typography variant="subtitle1" style={{ marginRight: '10px',marginTop:"15px" }}>
                    <strong>Attachments</strong>
                  </Typography>
     <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center',marginTop:"5px" }}>
     
     <Typography variant="subtitle1" style={{ marginRight: '10px' }}>
       <strong>PDF:</strong>  {post.pdf.split('\\').pop().split('/').pop()}
     </Typography>
     
    <Tooltip title="download pdf">
     <IconButton 
            style={{ marginRight: '8px', height: 'fit-content', fontSize: '20px', }}
       onClick={() => handleDownloadPDF(post.pdf)}
     >
     <FcDownload
                style={{ fontSize: '20px'}}
              /></IconButton></Tooltip>
            </div>
     </> )}
                <Box>
                  {post.images.length > 0 && (
                    <ImagePreviewContainer>
                      <ImagePreview src={post.images[currentImageIndex[post._id] || 0]} alt={`Post ${post._id} Image ${currentImageIndex[post._id] || 0}`} />
                      {post.images.length > 1 && (
                        <>
                          <IconButton
                            className="slider-nav-btn prev"
                            onClick={() => handlePrevImage(post._id)}
                            disabled={currentImageIndex[post._id] <= 0}
                            style={{
                              position: 'absolute',
                              top: '40%',
                              left: '10px',
                              transform: 'translateY(-50%)',
                              color: 'gray',
                              borderRadius: '50%',
                              padding: '3px',
                              boxShadow: '0 0 5px rgba(0, 0, 0, 0.5)',
                            }}
                          >
                            <ArrowBackIcon style={{
                              fontSize: "15px",
                            }} />
                          </IconButton>
                          <IconButton
                            className="slider-nav-btn next"
                            onClick={() => handleNextImage(post._id)}
                            disabled={currentImageIndex[post._id] >= post.images.length - 1}
                            style={{
                              position: 'absolute',
                              top: '40%',
                              right: '10px',
                              transform: 'translateY(-50%)',
                              color: 'gray',
                              borderRadius: '50%',
                              padding: '3px',
                              boxShadow: '0 0 5px rgba(0, 0, 0, 0.5)',
                            }}
                          >
                            <ArrowForwardIcon style={{
                              fontSize: "15px",
                            }} />
                          </IconButton>
                        </>
                      )}
                    </ImagePreviewContainer>
                  )}
                </Box>
                <CommentWrapper>
                <Avatar
                      alt={user?.firstName}
                      src={user?.profilePicture}
                      sx={{ marginRight: 1 }}
                    />
                    <CommentTextFieldStyled
                      placeholder="Add a comment..."
                      variant="outlined"
                      multiline
                      fullWidth
                      rows={1}
                      value={currentPostId === post?._id ? commentText : ''}
                      onChange={(e) => setCommentText(e.target.value)}
                      onKeyPress={(e) => handleKeyPress(e, post?._id)}
                      onFocus={() => setCurrentPostId(post?._id)}
                    />
                  {post.comments.length > 0 && post.comments.map((comment) => (
                    <CommentItemWrapper key={comment._id}>
                      <CommentAvatarstyled
                        alt={comment?.postedBy?.firstName}
                        src={comment?.postedBy?.profilePicture}
                      />
                      <PaperStyled>
                        <Typography variant="body2" color="textSecondary" mb={2}>
                          {comment?.postedBy?.firstName}
                        </Typography>
                        <Typography variant="body1">
                      
                          {comment.text}
                        </Typography>
                      </PaperStyled>
                      {comment?.postedBy?._id === userId && (
                        <DeleteIconButton aria-label="delete" onClick={() => handleDeleteComment(post._id, comment._id)}>
                          <FcEmptyTrash style={{ fontSize: "20px", color: "#5d87ff" }} />
                        </DeleteIconButton>
                      )}
                    </CommentItemWrapper>
                  ))}
                </CommentWrapper>
              </Box>
            </PostWrapper>
          ))}
        </ContainerStyled>
      </DashboardCard>
    </PageContainer>
  );
};

export default PostSpace;
