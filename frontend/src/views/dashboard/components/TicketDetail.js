import React, { useState,useEffect } from 'react';
import { Grid, Box, Button, IconButton, Tooltip, Chip, TextField, Avatar, Typography } from '@mui/material';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import AttachmentIcon from '@mui/icons-material/Attachment';
import ChildTicketIcon from '@mui/icons-material/PlaylistAdd';
import AssociationIcon from '@mui/icons-material/Link';
import ShareIcon from '@mui/icons-material/Share';
import CloseIcon from '@mui/icons-material/Close';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { IoIosArrowDown,IoIosArrowUp } from 'react-icons/io';
import { useDispatch,useSelector } from 'react-redux';
import {  addCommentToTicket, deleteCommentFromTicket, deleteticketsflag, updateComment, updateticketsflag, updateticketsimages } from 'src/JS/actions/Tickets';
import CropOriginalIcon from '@mui/icons-material/CropOriginal';
import CircularProgress from '@mui/material/CircularProgress';
import { StarOutline, Star } from '@mui/icons-material';

import { AtomicBlockUtils } from 'draft-js';
import { Sliderimages } from './Sliderimages';
import { useParams } from 'react-router';
import { close, getTasks } from 'src/JS/actions/tasks';
import VoteModal from '../VoteModal';
import { addFavorites, getFavorites, removeFavorites } from 'src/JS/actions/Favorites';
import { IoFlagSharp  } from "react-icons/io5";
import TicketdetailsMenu from './TicketdetailsMenu';

export default function TicketDetail({  isSecondGridOpen }) {
  const [ticketsdata, setTicketsData] = useState({
    descriptionticket: {},
  });
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.user);

  const [editDescription, setEditDescription] = useState({});
  const [descriptionText, setDescriptionText] = useState('Add a description');
  const [editorState, setEditorState] = useState(EditorState.createEmpty()); 
  const [images, setImages] = useState([]);
  const [isuplading, setIsUploading] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [commentText, setCommentText] = useState(''); 
  const [editingComment, setEditingComment] = useState({ ticketId: null, commentId: null });
  const [updatedComments, setUpdatedComments] = useState({});

  const { projectId } = useParams();

  //updateflag
  const handleFlagClick = (ticketid) => {
    dispatch(updateticketsflag(projectId,ticketid));
  };
  
  const deletingticketflag = (ticketid) => {
    dispatch(deleteticketsflag(projectId,ticketid)); 
  };
  
  //update comment

  const handleEditButtonClick = (ticketId, commentId) => {
    setEditingComment({ ticketId, commentId });
  };
  
  const handleTextFieldChange = (event, commentId) => {
    const { value } = event.target;
    
    setUpdatedComments((prevUpdatedComments) => ({
      ...prevUpdatedComments,
      [commentId]: value,
    }));
  };
  
//add favouirtes
const userId=user._id

useEffect(() => {
  dispatch(getFavorites(userId));
}, [dispatch, userId]);





const  favorites  = useSelector((state) => state.favouritesReducer.favourites);
console.log('Favorites:', favorites);

const handleToggleFavorite = (ticketid) => {
  console.log('Favorites:', favorites);

  if (Array.isArray(favorites) && favorites.find(favorite => favorite.ticketId._id === ticketid)) {
    dispatch(removeFavorites(ticketid, userId));
  } else {
    dispatch(addFavorites(ticketid, userId));
  }
};



  
  
  const handleTextFieldKeyDown = (event, ticketId, commentId) => {
    if (event.key === 'Enter') {
      const commenterId = user._id;
      const updatedCommentText = updatedComments[commentId];
      dispatch(updateComment(ticketId, commentId, commenterId, updatedCommentText));
      setEditingComment(null);
    }
  };
  
  
  
  //
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleKeyDown = (event,ticketId, ) => {
    const commenterId=user._id
    if (event.key === 'Enter' && commentText.trim() !== '') {
       dispatch(addCommentToTicket(projectId,ticketId, commenterId, commentText));
      setCommentText('');
    }
  };
  
  const handleDescriptionClick = (ticketId) => {
    setEditDescription((prevState) => ({
      ...prevState,
      [ticketId]: true,
    }));
  };


  

  const uploadImageToCloudinary = async (files) => {
    const cloudinaryUrl = 'https://api.cloudinary.com/v1_1/dxououehj/upload';
    const cloudinaryPreset = 'siwarse';
  
    const uploadedImages = [];
  
    try {
      setIsUploading(true);
  
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
  
      setIsUploading(false);
      return uploadedImages;
    } catch (error) {
      console.error('Error uploading image to Cloudinary: ', error);
      setIsUploading(false);
      return []; 
    }
  };

  const handleSaveDescription = async (ticketId) => {
    const contentState = editorState.getCurrentContent();
    const rawContentState = convertToRaw(contentState);
  
    const filteredBlocks = rawContentState.blocks.filter((block) => block.text.trim() !== '');
    const cleanedContentState = {
      blocks: filteredBlocks,
      entityMap: rawContentState.entityMap,
    };
  
    const descriptionText = JSON.stringify(cleanedContentState);
  
    // Check if both text and image are null
    if (!descriptionText && images.length === 0) {
      return;
    }
  
    const updatedTicketData = {
      descriptionText: descriptionText || ticketsdata[ticketId]?.descriptionticket?.descriptionText,
      imageD: images.length > 0 ? [...(ticketsdata[ticketId]?.descriptionticket?.imageD || []), ...images] : 
                                   ticketsdata[ticketId]?.descriptionticket?.imageD || [],
    };
  
    const updatedTicketsData = {
      ...ticketsdata,
      [ticketId]: {
        ...ticketsdata[ticketId],
        descriptionticket: updatedTicketData,
      },
    };
  
    try {
      setIsUploading(true);
  
      await dispatch(updateticketsimages(ticketId, { descriptionticket: updatedTicketData }));
      dispatch(getTasks(projectId));
  
      setIsUploading(false);
      setTicketsData(updatedTicketsData);
  
      setEditDescription((prevState) => ({
        ...prevState,
        [ticketId]: false,
      }));
      setEditorState(EditorState.createEmpty()); 
      setImages([]);
    } catch (error) {
      console.error('Error updating ticket data:', error);
      setIsUploading(false);
    }
  };
  

  //deletecomment
  const handleDeleteComment = (ticketId,commentId) => {
    const commenterId=user._id
 
    dispatch(deleteCommentFromTicket(ticketId,commentId, commenterId));
    dispatch(getTasks(projectId))
  };

  function formatCreatedAt(createdAt) {
    const now = new Date();
    const createdDate = new Date(createdAt);
    const diff = Math.abs(now - createdDate);
    const minutes = Math.floor(diff / 60000); 
    const hours = Math.floor(minutes / 60);
  
    if (minutes < 60) {
      return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
    } else if (hours < 24) {
      return `${hours} hour${hours === 1 ? '' : 's'} ago`;
    } else {
      const days = Math.floor(hours / 24);
      return `${days} day${days === 1 ? '' : 's'} ago`;
    }
  }
  const formattedCreationDate = (createdAt) => {
    const creationDate = new Date(createdAt);
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return ` ${months[creationDate.getMonth()]} ${creationDate.getDate()}, ${creationDate.getFullYear()} at ${creationDate.getHours()}:${creationDate.getMinutes()}`;
  };

  function formatupdatedat(updatedAt) {
    const now = new Date();
    const createdDate = new Date(updatedAt);
    const diff = Math.abs(now - createdDate);
    const minutes = Math.floor(diff / 60000); // 60000 milliseconds = 1 minute
    const hours = Math.floor(minutes / 60); // Convert minutes to hours
  
    if (minutes < 60) {
      return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
    } else if (hours < 24) {
      return `${hours} hour${hours === 1 ? '' : 's'} ago`;
    } else {
      const days = Math.floor(hours / 24);
      return `${days} day${days === 1 ? '' : 's'} ago`;
    }
  }
  
  
  
  
  
  
  
  const insertImage = (editorState, imageUrl) => {
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity('IMAGE', 'IMMUTABLE', { src: imageUrl });
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
    return AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' ');
  };
  

const insertImages = (editorState, imageUrls) => {
  let newEditorState = editorState;
  for (const imageUrl of imageUrls) {
    newEditorState = insertImage(newEditorState, imageUrl);
  }
  return newEditorState;
};


      const handleAddImage = () => {
        document.getElementById('imageInput').click();
      };
    const handleImageInputChange = async (event) => {
  const files = event.target.files;
  if (files.length > 0) {
    try {
      const uploadedImages = await uploadImageToCloudinary(files);
      if (uploadedImages.length > 0) {
        const newEditorState = insertImages(editorState, uploadedImages);
        setImages((prevImages) => [...(prevImages || []), ...uploadedImages]); 
        setEditorState(newEditorState);
      }
    } catch (error) {
      console.error('Error uploading images:', error);
    }
  }
};

      
      
      
      

  const cancel = (ticketId) => {
    setEditorState(EditorState.createEmpty());
    setImages(null);
    setEditDescription((prevState) => ({
        ...prevState,
        [ticketId]: false,
      }));  };

      const handleCloseTicketGrid = () => {
        dispatch(close()); 
      };


      //box details
      const [isDetailsOpen, setIsDetailsOpen] = useState({});

  const toggleDetails = (ticketId) => {
    setIsDetailsOpen(prevState => ({
      ...prevState,
      [ticketId]: !prevState[ticketId]
    }));
  };

  return (
    <>
      <Grid
        container
        spacing={3}
        display={'flex'}
        flexDirection={'row'}
        style={{
          overflow: 'auto',
          width: isSecondGridOpen ? '280px' : '1',
          flex: isSecondGridOpen ? '0.42' : '0',
          backgroundColor: 'white',
          marginLeft: '20px',
        }}
      >
        <Box
          display={'flex'}
          flexDirection={'column'}
          style={{
            overflow: 'auto',
            width: isSecondGridOpen ? '10px' : '1',
            flex: isSecondGridOpen ? '1' : '0',
            transition: 'width 0.8s',
            maxHeight: '700px',
            position: 'relative'
          }}
        >
          {Object.keys(isSecondGridOpen).map((taskId) => (
            <div key={taskId} >
              {Object.keys(isSecondGridOpen[taskId] || {}).map((ticketId ) => (
                <div key={ticketId}>
                  {isSecondGridOpen[taskId][ticketId] && (
                    <div >
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'flex-end',
                          marginLeft: '180px',
                          marginTop: '10px',
                          
                        

                        }}
                      >
                     
          <IconButton
    style={{ color: '#42526E' }}
    onClick={() => handleToggleFavorite(ticketId)}
>
  
{Array.isArray(favorites) && favorites.some(favorite => favorite.ticketId._id.toString() === ticketId.toString()) ?  <Star style={{color:"#c2c251"}} /> : <StarOutline  />}

</IconButton>



                     
                        <Tooltip title='Options of vote'>
                        <IconButton
  style={{ color: '#42526E' }}
  onClick={handleMenuOpen}
  aria-controls="vote-menu"
  aria-haspopup="true"
>
  <ThumbUpOffAltIcon />
  {isSecondGridOpen[taskId][ticketId].votes.length > 0 && (
    <span style={{ marginLeft: '5px', fontSize: '15px' }}>{isSecondGridOpen[taskId][ticketId].votes.length}</span>
  )}
</IconButton>

      </Tooltip>
    <VoteModal anchorEl={anchorEl} handleMenuClose={handleMenuClose} ticketId={ticketId} isSecondGridOpen={isSecondGridOpen} taskId={taskId} />
                        <IconButton style={{ color: '#42526E' }}>
                          <ShareIcon />

                        </IconButton>
                        <TicketdetailsMenu  handleflagclick={handleFlagClick} deletingticketflag={deletingticketflag} ticketid={ticketId} isSecondGridOpen={isSecondGridOpen} taskId={taskId} />

                        <IconButton onClick={handleCloseTicketGrid} style={{ color: '#42526E' }}>
                          <CloseIcon />
                        </IconButton>
                      </div>

                      <h3 style={{ marginLeft: '20px' }}>
                        {isSecondGridOpen[taskId][ticketId].Description}
                      </h3>
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'flex-end',
                          marginLeft: '20px',
                          marginTop: '10px',
                        }}
                      >
                        <IconButton
                          style={{
                            color: '#42526E',
                            backgroundColor: '#efefef',
                            borderRadius: '0',
                            marginRight: '4px',
                          }}
                        >
                          <AttachmentIcon />
                        </IconButton>
                        {/* Child Ticket Icon */}
                        <IconButton
                          style={{
                            color: '#42526E',
                            backgroundColor: '#efefef',
                            borderRadius: '0',
                            marginRight: '4px',
                          }}
                        >
                          <ChildTicketIcon />
                        </IconButton>
                        {/* Association Icon */}
                        <IconButton
                          style={{
                            color: '#42526E',
                            backgroundColor: '#efefef',
                            borderRadius: '0',
                          }}
                        >
                          <AssociationIcon />
                        </IconButton>
                      </div>
<div style={{display:'flex', flexDirection:"row"}}>
                      <Button
                        // aria-controls={
                        //   anchorEls[ticket._id] ? 'long-menu' : undefined
                        // }
                        // aria-expanded={Boolean(anchorEls[ticket._id])}
                        // aria-haspopup="true"
                        // onClick={(event) => handleClicked(event, ticket._id)}
                        style={{
                          fontSize: '10px',
                          width: '120px',
                          textAlign: 'center',
                          borderRadius: '3px',
                          height: '25px',
                          fontWeight: 'bold',
                          marginTop: '20px',
                          marginLeft: '20px',
                          backgroundColor:
                            isSecondGridOpen[taskId][ticketId].Etat === 'TO DO'
                              ? '#7ca1f35e'
                              : isSecondGridOpen[taskId][ticketId].Etat === 'IN_PROGRESS'
                              ? 'rgb(227 226 226 / 55%)'
                              : 'rgb(214 247 210)',

                          marginRight: '10px',

                          color:
                            isSecondGridOpen[taskId][ticketId].Etat === 'TO DO'
                              ? '#5d87ff'
                              : isSecondGridOpen[taskId][ticketId].Etat === 'IN_PROGRESS'
                              ? 'rgb(107 107 107)'
                              : 'rgb(12 119 26)',
                          fontFamily: 'system-ui',
                        }}
                      >
                        <span>{isSecondGridOpen[taskId][ticketId].Etat}</span>
                        <IoIosArrowDown
                          style={{
                            marginTop: '1px',
                            fontSize: '12px',
                            marginLeft: '5px',
                            fontWeight: 'bolder',
                          }}
                        />
                      </Button>
                      
                      {isSecondGridOpen[taskId][ticketId].flag && (
                        <>
                      <IoFlagSharp  style={{color:"#c04747",marginTop:"25px"}} />
                      <span style={{color:"var(--ds-text-subtlest,#6b778c)",marginTop:"20px",marginLeft:"5px",fontFamily:"system-ui",lineHeight:"24px",maxWidth:"200px"}} >Marqued</span></>)}
                      </div>

                    


                      

                      <div style={{marginBottom:"25px"}}>
  <h4 style={{ marginLeft: '20px' }}>Description</h4>

  






 {editDescription[ticketId] ? (
   <>
   <input
     type="file"
     id="imageInput"
     accept=".png,.jpg,.jpeg"
     style={{ display: 'none' }}
     onChange={handleImageInputChange}
     multiple
   />

   <Editor
     editorState={editorState}
     onEditorStateChange={setEditorState}
     toolbar={{
       options: [
         'inline',
         'blockType',
         'fontSize',
         'fontFamily',
         'list',
         'textAlign',
         'colorPicker',
         'link',
         'embedded',
         'emoji',
       ],
       inline: {
         options: ['bold', 'italic', 'underline', 'strikethrough'],
       },
       list: { options: ['unordered', 'ordered'] },
       textAlign: { options: ['left', 'center', 'right', 'justify'] },
       embedded: { options: ['embedded'] },
     }}
     toolbarCustomButtons={[
       <Tooltip title="Add an image" key="image-tooltip">
         <CropOriginalIcon
           onClick={handleAddImage}
           style={{
             cursor: 'pointer',
             width: '25px',
             marginTop: '5px',
             overflow: 'clip',
           }}
         />
         {isuplading && (
           <CircularProgress
             key="spinner"
             style={{ marginLeft: '10px', width: '25px' }}
           />
         )}
       </Tooltip>,
     ]}
     wrapperClassName="editor-wrapper"
     editorClassName="editor-content"
   />

   <Button
     style={{
       backgroundColor: '#42a5f559',
       color: 'black',
       marginRight: '8px',
       marginLeft: '8px',
     }}
     onClick={() => handleSaveDescription(ticketId)}
   >
     save
   </Button>
   <Button
     style={{ backgroundColor: 'transparent', color: 'black' }}
     onClick={() => cancel(ticketId)}
   >
     cancel
   </Button>
 </>
) : (
 <>

    {isSecondGridOpen[taskId][ticketId]?.descriptionticket?.descriptionText ? (
      JSON.parse(isSecondGridOpen[taskId][ticketId]?.descriptionticket?.descriptionText || '{}').blocks.length === 0 ? (
        // If there are no blocks in the description text, render the default text span
        <span
          onClick={() => handleDescriptionClick(ticketId)}
          style={{
            marginLeft: '20px',
            cursor: 'pointer',
            backgroundColor: editDescription[ticketId] ? 'gray' : 'transparent',
            padding: '8px',
            borderRadius: '4px',
            transition: 'background-color 0.3s',
          }}
        >
          {descriptionText}
        </span>
      ) : (
        // If there are blocks in the description text, render the extracted text
        <>
          {JSON.parse(isSecondGridOpen[taskId][ticketId]?.descriptionticket?.descriptionText || '{}').blocks.map((block, index) => {
            let text = block.text;
            let style = {}; 

            // Apply inline styles
            block.inlineStyleRanges.forEach((range) => {
              if (range.style.includes('BOLD')) {
                style.fontWeight = 'bold';
              }
              if (range.style.includes('ITALIC')) {
                style.fontStyle = 'italic';
              }
              if (range.style.includes('STRIKETHROUGH')) {
                style.textDecoration = 'line-through';
              }
              if (range.style.startsWith('fontfamily-')) {
                const fontFamily = range.style.replace('fontfamily-', '');
                style.fontFamily = fontFamily;
              }
              if (range.style.startsWith('fontsize-')) {
                const fontsize = range.style.replace('fontsize-', '');
                style.fontSize = fontsize;
              }
            });

            let renderedText = (
              <span 
                onClick={() => handleDescriptionClick(ticketId)}
                style={{ ...style, marginLeft: '20px', cursor: 'pointer', backgroundColor: editDescription[ticketId] ? 'gray' : 'transparent', transition: 'background-color 0.3s' }}>
                {text}
              </span>
            );

            return renderedText;
          })}
        </>
      )
    ) : (
      // Render a default UI element when description text is null or undefined
      <span
        onClick={() => handleDescriptionClick(ticketId)}
        style={{
          marginLeft: '20px',
          cursor: 'pointer',
          backgroundColor: editDescription[ticketId] ? 'gray' : 'transparent',
          padding: '8px',
          borderRadius: '4px',
          transition: 'background-color 0.3s',
        }}
      >
        {descriptionText}
      </span>
    )}
  </>
)}

 

 
 




    


                      </div>
                      
                      {isSecondGridOpen[taskId][ticketId]?.descriptionticket?.imageD?.length > 0 && (
                        <>
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <h4 style={{ marginLeft: '20px', marginTop: "20px" }}>Attachments</h4>
    <Chip
      label={isSecondGridOpen[taskId][ticketId]?.descriptionticket?.imageD?.length || 0}
      style={{ marginLeft: '15px', marginTop: '1px', width: '35px', height: '20px', fontSize: '10px', fontWeight: "bold" }}
    />
  </div>

<Sliderimages
  images={images}
  isSecondGridOpen={isSecondGridOpen}
  taskId={taskId}
  ticketId={ticketId}
/>
</>)}


                    </div>

                  )}


                  {/* details box  */}

                  <Box style={{ position: 'relative' }}>
      <Box
        style={{
          position: isDetailsOpen[ticketId] ? "relative" : "sticky",
          top: 0,
          zIndex: 1,
          border: isDetailsOpen[ticketId] ? '2px solid  rgb(124, 170, 255)' : '2px solid #dbdbdb',
          padding: '10px',
          cursor: 'pointer',
          width:"370px",
          marginLeft:"10px",
          backgroundColor:isDetailsOpen[ticketId] ?"#ebebeb91" :"#fff",
    }}
        onClick={() => toggleDetails(ticketId)}
      >
 <Typography style={{ color: "#6c6c6c", fontWeight: "bold", fontSize: "14px" }}>
          Details
          <span>
            {isDetailsOpen[ticketId] ? <IoIosArrowUp style={{ marginLeft: "280px" }} /> : <IoIosArrowDown style={{ marginLeft: "280px",fontWeight: "bold" }} />}
          </span>
        </Typography>      
      </Box>

      {isDetailsOpen[ticketId] && (
  <Box
    style={{
      border: '1px solid #c0c0c0',
      padding: '10px',
      marginTop: '-1px', 
      width: "370px",
      marginLeft: "10px"
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ marginLeft: "10px", marginTop: "10px",color: "rgb(71 71 71)" }}>Responsable</div>
      <span>
        <Avatar
          src={isSecondGridOpen[taskId][ticketId]?.ResponsibleTicket?.profilePicture}
          sx={{
            bgcolor: '#42a5f5',
            width: '25px',
            height: '25px',
            fontSize: '10px',
            alignItems: 'center',
            marginTop: "5px",
            marginLeft: '80px'
          }}
        >
          {isSecondGridOpen[taskId][ticketId]?.ResponsibleTicket?.firstName && isSecondGridOpen[taskId][ticketId]?.ResponsibleTicket?.firstName.substring(0, 2).toUpperCase()}
        </Avatar>
      </span>
      <Typography style={{ marginLeft: "10px", marginTop: "10px" }}>
    {isSecondGridOpen[taskId][ticketId]?.ResponsibleTicket?.firstName || "Not assigned"}
</Typography>
    </div>
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ marginLeft: "10px", marginTop: "10px",color: "rgb(71 71 71)" }}>Parent</div>
      <Button
                                       
                                        style={{
                                          fontSize:'12px',
                                          width: "fit-content",
                                          textAlign: 'center',
                                          borderRadius: '3px',
                                          height: 'fit-content',
                                          fontWeight: 'bold',
                                          marginBottom: '3px',
                                          fontFamily: 'sans-serif',
                                          marginLeft:'120px',
                                          marginTop:'10px',
                                          color: isSecondGridOpen[taskId][ticketId].Feature?.iconF === '#7CA1F3' ? '#385DB0' :
                                          isSecondGridOpen[taskId][ticketId].Feature?.iconF === '#CDF7D4' ? '#51A15F' :
                                          isSecondGridOpen[taskId][ticketId].Feature?.iconF === '#ffc0ca' ? '#CC596B' : '#878787',
                                          backgroundColor: isSecondGridOpen[taskId][ticketId].Feature?.iconF}}
                                      >
                                        <span>{ isSecondGridOpen[taskId][ticketId].Feature.titleF}</span></Button>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ marginLeft: "10px", marginTop: "10px",color: "rgb(71 71 71)" }}>Task</div>
   <span>
      <Typography >{isSecondGridOpen[taskId][ticketId].TaskId.TaskName}</Typography>
</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ marginLeft: "10px", marginTop: "10px",color: "rgb(71 71 71)" }}>Priortiy</div>
   <span>
   <Button
                                       
                                        style={{
                                          fontSize:'12px',
                                          width: "fit-content",
                                          textAlign: 'center',
                                          borderRadius: '3px',
                                          height: 'fit-content',
                                          fontWeight: 'bold',
                                          marginBottom: '3px',
                                          fontFamily: 'sans-serif',
                                          marginLeft:'120px',
                                          marginTop:'10px',
                                          backgroundColor:
                                          isSecondGridOpen[taskId][ticketId].Priority === 'Low'
                                              ? '#9f8fef7d'
                                              : isSecondGridOpen[taskId][ticketId].Priority === 'High'
                                              ? '#cdf7d4'
                                              : '#ffc0ca',

                                          marginRight: '70px',

                                          color:
                                          isSecondGridOpen[taskId][ticketId].Priority === 'Low'
                                              ? '#5b356fcc'
                                              : isSecondGridOpen[taskId][ticketId].Priority === 'High'
                                              ? 'rgb(35 145 115)'
                                              : '#c1535c',
                                        }}
                                      >
                                        <span style={{ fontSize: '13px' }}>{isSecondGridOpen[taskId][ticketId].Priority}</span>
                                       
                                      </Button></span>
      </div>    {/* <div style={{ marginLeft: "10px", marginTop: "10px" }}>Labels</div> */}
  </Box>
)}

      
    </Box>


    <Typography style={{ marginLeft: '20px', marginTop: "20px" ,fontFamily:'sans-serif',fontsize:"15px",color:'gray'}}>
      creation  {formattedCreationDate(isSecondGridOpen[taskId][ticketId]?.createdAt)}
      </Typography>
      <Typography style={{ marginLeft: '20px', marginTop: "10px" ,fontFamily:'sans-serif',fontsize:"15px",color:'gray'}}>
      updated  {formattedCreationDate(isSecondGridOpen[taskId][ticketId]?.updatedAt)}
      </Typography>








                  <Box style={{  position: 'sticky', bottom: 0, display: 'flex', flexDirection: 'row', alignItems: 'flex-end',backgroundColor:"white",marginLeft:"10px" ,marginTop:"200px"}}>
 <Avatar
    src={user?.profilePicture}
    sx={{
      bgcolor: '#42a5f5',
      width: '30px',
      height: '30px',
      fontSize: '15px',
      alignItems: 'center',
      marginBottom:"20px",
      marginLeft: '10px'
    }}
  >
    {user?.firstName && user?.firstName.substring(0, 2).toUpperCase()}
  </Avatar>
  <TextField
      id="comment-textfield"
      label="Add a comment ..."
      variant="outlined"
      value={commentText}
      onChange={(e) => setCommentText(e.target.value)} 
      onKeyDown={(e) => handleKeyDown(e, ticketId)} 
      style={{ marginLeft: '10px', width: '80%', height: '60px', marginTop: '10px' }}
    />
 
</Box>

{isSecondGridOpen[taskId][ticketId]?.comments && isSecondGridOpen[taskId][ticketId]?.comments.length > 0 && (
  <Box style={{ marginTop: '20px', marginLeft: '10px', marginBottom: "10px" }}>
    {isSecondGridOpen[taskId][ticketId]?.comments.map((comment, index) => (
      <div key={index}>  
        <Box style={{ display:"flex", flexDirection:"row" ,marginTop:"13px"}}>
          <Avatar
            src={comment?.commenterId?.profilePicture}
            sx={{
              bgcolor: '#42a5f5',
              width: '30px',
              height: '30px',
              fontSize: '13px',
              alignItems: 'center',
              marginBottom:"20px",
              marginLeft: '10px',
              marginRight: '10px',
              marginTop:"5px"
            }}
          >
            {comment?.commenterId?.firstName && comment?.commenterId?.firstName.substring(0, 2).toUpperCase()}
          </Avatar>
          <Box style={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="body1" style={{ marginTop: '5px', color: "#515d70", fontWeight: "500", fontFamily: "inherit" }}>
  {comment?.commenterId?.firstName}
  <span style={{ marginLeft: "8px", color: "gray" }}>
    {comment?.updatedAt !== comment?.createdAt ? (
      <>
         {formatupdatedat(comment?.updatedAt)}
        {comment?.createdAt !== comment?.updatedAt && <span style={{ marginLeft: "10px",color:"#a3a3a3" }}>Edited</span>}
      </>
    ) : (
      formatCreatedAt(comment?.createdAt)
    )}
  </span>
</Typography>


<Typography variant="body1" style={{ marginTop: '4px' }}>
  {editingComment?.ticketId === ticketId && editingComment?.commentId === comment?._id ? (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <TextField
        value={updatedComments[comment?._id] } 
        onChange={(event) => handleTextFieldChange(event, comment?._id)}
        onKeyDown={(event) => handleTextFieldKeyDown(event, ticketId, comment?._id)} 
        style={{ width: '80%', minHeight: '30px' }}
        variant="standard"          
      /> 
      <button
        onClick={() => setEditingComment(ticketId,comment?._id)} 
        className="hover-underline" 
        style={{ 
          border: 'none',
          background: 'none',
          cursor: 'pointer',
          marginRight: '10px',
          padding: '0',
          color: '#515d70',
          fontSize: 'inherit',
          fontFamily: 'inherit',
          fontWeight: '500',
        }}
      >
        Cancel
      </button>
    </div>
  ) : (
    comment.comment
  )}
</Typography>


<div style={{ display: 'flex', marginTop: '8px' }}>
  <button
    onClick={() => handleEditButtonClick(ticketId, comment?._id)} 
    className="hover-underline" 
    style={{ 
      border: 'none',
      background: 'none',
      cursor: 'pointer',
      marginRight: '10px',
      padding: '0',
      color: '#515d70',
      fontSize: 'inherit',
      fontFamily:"inherit",
      fontWeight:"500",
    }}
  >
    Update
  </button>
              <button 
  onClick={() => handleDeleteComment(ticketId,comment?._id,)}
  className="hover-underline" style={{ 
                border: 'none',
                background: 'none',
                cursor: 'pointer',
                padding: '0',
                color: '#515d70',
                fontSize: 'inherit',
                fontFamily:"inherit",
                fontWeight:"500",
              }}>
                Delete
              </button>
            </div>
          </Box>
        </Box>
      </div>
    ))}
  </Box>
)}




                </div>
              ))}
 
 
            </div>
            
            
          ))}
          
         
        </Box>
      
      </Grid>{' '}
    </>
  );
}
