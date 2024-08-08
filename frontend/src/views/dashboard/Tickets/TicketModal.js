import React, { useState, useRef } from 'react';
import { Modal, Box, Typography, Button, TextField,Menu, IconButton, Avatar, Divider, Chip } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { CgImage } from "react-icons/cg";
import { ImAttachment } from "react-icons/im";
import { MdOutlineNewLabel } from "react-icons/md";
import CoverImageMenu from 'src/components/Menu/CoverImageMenu';
import { Editorr } from '../components/Editorr';
import { EditorState, convertToRaw } from 'draft-js';
import { AtomicBlockUtils } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { addCommentToTicket, deleteImage, getListTicketsByproject, updatetickets, updateticketsimages } from 'src/JS/actions/Tickets';
import { getTasks } from 'src/JS/actions/tasks';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { IoEyeOutline } from "react-icons/io5";
import CommentTicket from './CommentTicket';
import UpdateImage from 'src/components/Menu/Updateimage';

const TicketModal = ({ open, handleClose, ticket ,user}) => {
//editor 
    const [editDescription, setEditDescription] = useState({});
  const [descriptionText, setDescriptionText] = useState('Add a description');
  const [selectedColor, setSelectedColor] = useState('');

  const [editorState, setEditorState] = useState(EditorState.createEmpty()); 
  const [ticketsdata, setTicketsData] = useState({
    descriptionticket: {},
  });
  const dispatch = useDispatch();
  const [images, setImages] = useState([]);
  const [isuplading, setIsUploading] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [hoveredIndex, setHoveredIndex] = useState(-1);
    const [commentText, setCommentText] = useState(''); 

    const { projectId } = useParams();

    //update image name
    const [menuAnchor, setMenuAnchor] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(null);


    const handleOpenMenu = (event, index) => {
      setMenuAnchor(event.currentTarget);
      setSelectedIndex(index);
    };
  
    //attachements 
    const imagess = ticket.descriptionticket?.imageD || [];
     // Extract image name from URL
  const getImageNameFromUrl = (url) => {
    return url.substring(url.lastIndexOf('/') + 1);
  };

    const handleMenuOpen = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleMenuClose = () => {
      setAnchorEl(null);
      setSelectedColor(null)
    };
  
    const ismenuOpen = Boolean(anchorEl);

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



const handleCloseMenu = () => {
  setMenuAnchor(null);
  setSelectedIndex(null);
};


const handleDeleteImage = (ticketId) => {
  dispatch(deleteImage(ticketId, selectedIndex, projectId));
  handleCloseMenu();
};

const handleDescriptionClick = (ticketId) => {
    setEditDescription((prevState) => ({
      ...prevState,
      [ticketId]: true,
    }));
  };


  const cancel = (ticketId) => {
    setEditorState(EditorState.createEmpty());
    setImages(null);
    setEditDescription((prevState) => ({
        ...prevState,
        [ticketId]: false,
      }));  };

   
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
          dispatch(getListTicketsByproject(projectId));
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
//add comment
const handleKeyDown = (event,ticketId) => {
    const commenterId=user?._id
    if (event.key === 'Enter' && commentText.trim() !== '') {
       dispatch(addCommentToTicket(projectId,ticketId, commenterId, commentText));

      setCommentText('');
    }
  };


  // const [colorStyle, setColorStyle] = useState({
  //   backgroundColor: ticket.CoverImage && ticket.CoverImage.length > 0
  //     ? ticket.CoverImage[0].colorimage
  //     : selectedColor || '#ffffff',
  // });
 
  if (!open) {
    return null;
  }
  

 


  return (
    <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
>
<Box sx={style}>
        <Box
          style={{
            backgroundColor: ismenuOpen &&  selectedColor ||  ticket.CoverImage[0]?.colorimage, 
           
            width: '100%',
            height: '20%',
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 1,
           
          }}
        />
        <Box
          style={{
            position: 'relative',
            zIndex: 2,
            marginTop: '10%', 
            padding: '10px', 
            backgroundColor: 'white',
            // borderRadius: '10px',
            overflowY: 'auto',
            maxHeight: 'calc(100% - 10%)', 
          }}
        >
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} ml={3}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {ticket.Description}
            </Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
       

        <Box display="flex" mb={2} flexDirection={{ xs: 'column', md: 'row' }}ml={3}>
          <Box flexGrow={1} >
            <Typography id="modal-modal-description" variant="body2">
            <Typography variant="subtitle2" style={{ color: "#172b4d", display: 'flex', alignItems: 'center' }}>
  In Table
  <span style={{ textDecoration: 'underline', marginLeft: "5px", textUnderlineOffset: '', color: "var(--ds-text-subtle,#44546f)", fontWeight: "bold", display: 'inline-flex', alignItems: 'center' }}>
    {ticket.Etat}
    <IoEyeOutline style={{ fontSize: "20px", marginLeft: "10px", color: "var(--ds-text-subtle,#44546f)" }} />
  </span>
</Typography>

            </Typography>
            <Divider sx={{ my: 2 }} />
{ticket.Feature && (
                        <Typography variant="subtitle1"mb={2} style={{color:"#172b4d",fontWeight:"bold"}}>Feature</Typography>
                    )}
           {ticket.Feature && (
  <Box display="flex" gap={1} mb={2}>
                <Box  sx={{ backgroundColor: ticket?.Feature?.iconF,   fontFamily: 'sans-serif',
                fontWeight:"bold",
                color: ticket.Feature?.iconF === '#7CA1F3' ? '#385DB0' :
                ticket.Feature?.iconF === '#CDF7D4' ? '#51A15F' :
                ticket.Feature?.iconF === '#ffc0ca' ? '#CC596B' : '#878787',
                     padding: '5px 10px', borderRadius: '5px' }}>
                  {ticket?.Feature?.titleF}
                </Box>
              
            </Box>)}

            <Typography variant="subtitle1"mb={2} style={{color:"#172b4d",fontWeight:"bold"}}>Description</Typography>
            {/* <TextField
              fullWidth
              multiline
              rows={4}
              variant="outlined"
            //   defaultValue={task.longDescription}
              sx={{ mb: 2 }}
            /> */}
          <div style={{marginBottom:"25px"}}>

  






 {editDescription[ticket._id] ? (
   <>
   <input
     type="file"
     id="imageInput"
     accept=".png,.jpg,.jpeg"
     style={{ display: 'none' }}
     onChange={handleImageInputChange}
     multiple
   />
   

<Editorr  editorState={editorState} setEditorState={setEditorState} handleAddImage={handleAddImage} isuplading={isuplading}/>
 

   <Button
     style={{
       backgroundColor: '#42a5f559',
       color: 'black',
       marginRight: '8px',
       marginLeft: '8px',
       marginTop:"20px"
     }}
     onClick={() => handleSaveDescription(ticket._id)}
   >
     save
   </Button>
   <Button
     style={{ backgroundColor: 'transparent', color: 'black',       marginTop:"20px"
     }}
     onClick={() => cancel(ticket._id)}
   >
     cancel
   </Button>
 </>
) : (
 <>

    {ticket.descriptionticket?.descriptionText ? (
      JSON.parse(ticket?.descriptionticket?.descriptionText || '{}').blocks.length === 0 ? (
        // If there are no blocks in the description text, render the default text span
        <span
          onClick={() => handleDescriptionClick(ticket._id)}
          style={{
            marginLeft: '20px',
            cursor: 'pointer',
            backgroundColor: editDescription[ticket._id] ? 'gray' : 'transparent',
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
          {JSON.parse(ticket?.descriptionticket?.descriptionText || '{}').blocks.map((block, index) => {
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
                onClick={() => handleDescriptionClick(ticket._id)}
                style={{ ...style, marginLeft: '20px', cursor: 'pointer', backgroundColor: editDescription[ticket._id] ? 'gray' : 'transparent', transition: 'background-color 0.3s' }}>
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
        onClick={() => handleDescriptionClick(ticket._id)}
        style={{
          marginLeft: '20px',
          cursor: 'pointer',
          backgroundColor: editDescription[ticket._id] ? 'gray' : 'transparent',
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

        
            {ticket?.descriptionticket?.imageD?.length > 0 && (
                
                        <>

  <div style={{ display: 'flex', alignItems: 'center',overflow:"auto",maxHeight:"200px" }}>
  <Typography  mb={3} variant="subtitle1" style={{color:"#172b4d",fontWeight:"bold"}}> Attachments</Typography>

    <Chip
     
      label={ticket?.descriptionticket?.imageD?.length || 0}
      style={{ marginLeft: '15px', width: '35px', height: '20px', fontSize: '10px', fontWeight: "bold",marginBottom:"25px" }}
    />
  </div>
  {imagess.map((image, index) => (
   <Box
   key={index}
   display="flex"
   alignItems="center"
   mb={2}
   style={{
     backgroundColor: hoveredIndex === index ? '#dedede42' : '',
     transition: 'background-color 0.3s',
   }}
   onMouseEnter={() => setHoveredIndex(index)}
   onMouseLeave={() => setHoveredIndex(-1)}
 >
            <img src={image} alt={getImageNameFromUrl(image)} style={{ width: 90, height: 90, marginRight: 20 }} />
            <Box flexGrow={1}>
              <Typography variant="body1" style={{color:"var(--ds-text,#172b4d)",fontWeight:"bold"}}>{getImageNameFromUrl(image)} </Typography>
              {/* <Typography variant="caption"></Typography> <Button size="small">Commenter</Button> */}
            {/* <Button size="small">Télécharger</Button> */}
            <Button style={{marginTop:"15px"}} size="small"  onClick={(event) => handleOpenMenu(event, index)}>delete</Button>
            {/* <Button style={{marginTop:"15px"}} size="small"  >Modifiy</Button> */}


            <UpdateImage setMenuAnchor={setMenuAnchor} menuAnchor={menuAnchor} handleDeleteImage={handleDeleteImage} handleCloseMenu={handleCloseMenu} ticket={ticket} />






            </Box>
           
          </Box>
        ))}

</>)}


            <Typography variant="subtitle1" mb={2} style={{color:"#172b4d",fontWeight:"bold"}}>Comments</Typography>
            <Box>
            
            <Box style={{ position: 'sticky', bottom:0, width: '90%', alignItems: 'flex-end' }}>
  <Box display="flex" alignItems="center" mb={1}>
    <Avatar
     
     src={user.profilePicture} alt="Current User" sx={{ width: 32, height: 32, mr: 1,        fontSize:'13px'
     }} >   {user?.firstName && user.firstName.substring(0, 2).toUpperCase()}</Avatar>
    <TextField
      fullWidth
      variant="outlined"
      placeholder="add a comment..."
      value={commentText}

      onChange={(e) => setCommentText(e.target.value)} 
      onKeyDown={(e) => handleKeyDown(e, ticket._id)} 
      InputProps={{
        style: {
          backgroundColor: 'rgba(255, 255, 255, 0.10)',
          borderRadius: '8px',
          height: '40px',
        },
      }}
    />
  </Box>
</Box>


              {ticket.comments && ticket?.comments.length > 0 && ticket.comments && ticket.comments.map((comment, index) => (
             
                <CommentTicket comment={comment} index={index} user={user} projectId={projectId} ticketId={ticket._id} />
              ))} 
            </Box>
          </Box>

          <Box ml={{ md: 4 }} mt={{ xs: 2, md: 0 }} flexShrink={0} style={{ display: "flex", flexDirection: "column" }} width={{ xs: '100%', md: '200px' }}>
      <Typography variant="subtitle1" mt={4} style={{ marginBottom: "10px" }}>Add to Ticket</Typography>
      <Button
        onClick={handleMenuOpen}
        style={{
          backgroundColor: '#091e420f',
          color: "var(--ds-text,#172b4d)",
          fontWeight: "500",
          borderRadius: "3px",
          whiteSpace: "nowrap",
          justifyContent: 'flex-start',
          textTransform: 'none'
        }}
        sx={{ mb: 1 }}
        startIcon={<CgImage style={{ fontSize: "15px", marginRight: "4px", marginLeft: "4px" }} />}
      >
        Cover Image
      </Button>
      <CoverImageMenu anchorEl={anchorEl} isOpen={ismenuOpen} onClose={handleMenuClose}  user={user} projectId={projectId} ticketId={ticket?._id} selectedColor={selectedColor} setSelectedColor={setSelectedColor}/>

      <Button
        style={{ backgroundColor: '#091e420f', color: "var(--ds-text,#172b4d)", fontWeight: "500", borderRadius: "3px", whiteSpace: "nowrap", justifyContent: 'flex-start', textTransform: 'none' }}
        sx={{ mb: 1 }}
        startIcon={<ImAttachment  style={{ fontSize: "15px", marginRight: "4px",marginLeft:"4px" }} />}

      >
        Attachments
      </Button>
      <Button
        style={{ backgroundColor: '#091e420f', color: "var(--ds-text,#172b4d)", fontWeight: "500", borderRadius: "3px", whiteSpace: "nowrap", justifyContent: 'flex-start', textTransform: 'none' }}
        sx={{ mb: 1 }}
        startIcon={<MdOutlineNewLabel  style={{ fontSize: "15px", marginRight: "4px",marginLeft:"4px" }} />}

      >
Features      </Button>
    </Box>
        </Box>
      </Box></Box>
    </Modal>
  );
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  maxWidth: '800px',
  maxHeight: '95vh',
  bgcolor: 'background.paper',
  borderRadius: '10px',
  overflowY: 'auto',
};

export default TicketModal;
