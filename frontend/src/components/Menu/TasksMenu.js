import React, { useEffect,useState} from 'react';
import {  Box, TextField ,MenuItem, ListItem, Checkbox,Menu} from '@mui/material';

import Button from '@mui/material/Button';
import { IoIosArrowDown } from 'react-icons/io';
import FormControlLabel from '@mui/material/FormControlLabel';
import {  useSelector,useDispatch } from 'react-redux';
import { getTasks } from 'src/JS/actions/tasks';
import { useParams } from 'react-router';


export default function TasksMenu  ({selectedTasks,setselectedTasks}) {
    const [anchorEl, setAnchor] = useState(null);
    const [isMenuOpened, setisMenuOpened] = useState(false);

    const handleMenu = (event) => {
        setisMenuOpened((prevOpen) => !prevOpen);
        setAnchor(event.currentTarget); 
    };

    const handleMenuClosed = () => {
        setisMenuOpened(false); 
        setAnchor(null); 
    };
    const dispatch = useDispatch();
    const { projectId } = useParams();

    useEffect(() => {
        dispatch(getTasks(projectId));
             
    }, [dispatch, projectId, ]);

    const [searchQuery, setSearchQuery] = useState('');


    const handletaskCheckboxChange = (task) => {
        if (selectedTasks.includes(task)) {
            setselectedTasks(selectedTasks.filter((selectedTasks) => selectedTasks !== task));
        } else {
            setselectedTasks([...selectedTasks, task]);
        }
    };

    const Tasks = useSelector((state) => state.tasksReducer.tasks.filter((task) =>task.StartDate != null));


    const filteredTasks = Tasks.filter((task) =>
    task.TaskName.toLowerCase().includes(searchQuery.toLowerCase())
    );
   
    return (
        <>
        <Button
                    onClick={handleMenu}
                    id="feature-menu-button"
                    aria-controls={isMenuOpened ? 'feature-menu' : undefined}
                    aria-expanded={isMenuOpened}
                    aria-haspopup="true"
                    style={{
                        backgroundColor: isMenuOpened ? 'rgb(231 236 251 / 85%)' : '',
                        color: 'rgb(60, 73, 95)',
                        fontWeight: '800',
                        marginLeft: '28px',
                        marginTop: '3px',
                        marginBottom:"25px",
    
                    }}
                >
                    Tasks{' '}
                    <IoIosArrowDown
                        style={{
                            marginLeft: '5px',
                            marginTop: '5px',
                            fontWeight: 'bold',
                            transform: isMenuOpened ? 'rotateX(180deg)' : 'none',
                        }}
                    />
                </Button>
                <Menu
                    id="feature-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClosed}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    sx={{
                        '& .MuiMenu-paper': {
                            width: '280px',
                            height: '200px' ,
                        },
                    }}
                >
                    <TextField
                        variant="outlined"
                        placeholder="Search Tasks"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        sx={{
                            marginBottom: '8px',
                            marginLeft: "5px",
                            width: '259px',
                        }}
                    />
                    <Box style={{ overflow: "auto", maxHeight: "100px" }}>
                        {filteredTasks.map((task, index) => (
                            <ListItem key={index} disablePadding>
                              <MenuItem 
    sx={{ 
        width: "280px", 
        '&:hover': { 
            borderLeft: '2px solid #7caaff', 
            backgroundColor: 'rgb(231 236 251 / 85%)' 
        }
    }}
>
                                <FormControlLabel
                        control={<Checkbox
                            checked={selectedTasks.includes(task.TaskName)}
                            onChange={() => handletaskCheckboxChange(task.TaskName)}
                            size="small" />}
                        label={task.TaskName}
                    />
                                </MenuItem>
                            </ListItem>
                        ))}
                    </Box>
                   </Menu>
                   </>
    );
  }
   

