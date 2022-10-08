import { AppBar, Container, Toolbar,Box, Typography, IconButton, Stack, Avatar, Dialog, DialogContent, List, ListItem, Divider, Button, Input ,Tooltip} from '@mui/material'
import React,{useState} from 'react'
import SwitchAccountIcon from '@mui/icons-material/SwitchAccount';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import { query,addDoc,collection, doc,getDocFromCache,getDocs, collectionGroup } from 'firebase/firestore';
import { db } from '../../database/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { AddUser } from '../../redux/user/UserSlice';

function Navbar() {
    const [SwitchAc, setSwitchAc] = useState(false);
    const [AddAcc, setAddAcc] = useState(false);
    const [userName,setUsername] = useState('')
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    console.log(user)
 
        const Createuser= async()=>{
            const q = query(collection(db,`${userName}`))
            const docRef = await addDoc(q,{Title:"Empty Note"})
            setUsername('')
            dispatch(
                AddUser({
                    User: userName
                })
            )
          
            setAddAcc(false)
          } 

       


  return (
        <AppBar sx={{boxShadow:"none"}}>
            {/* <Container maxWidth={'xl'}> */}
            <Toolbar  sx={{background:"#ffffff",padding:"10px"}}>
                <Box sx={{flexGrow:1,display:"flex",alignItems:"center"}}>
                    <LibraryBooksIcon sx={{color:"red"}}/>
                    <Typography sx={{color:"#000000",fontSize:"20px",fontWeight:"800",padding:"0px 3px"}}>Xnotekeeper</Typography>
                </Box>
                <Box sx={{backgroundColor:'#FF7C8F',padding:"5px 5px",borderRadius:"50px",boxShadow:"0px 0px 5px 3px rgba(255,124,143,0.5)"}}>
                   <Stack justifyContent={'center'} alignItems="center" direction={"row"} gap={1}>
                    <Avatar alt="userName" src="" sx={{backgroundColor:"#FFFFFF",color:"#DEDEDE"}} />
                    <Typography sx={{color:"#FFFFFf",fontWeight:"800"}}>{(user.length > 0)? user[0].User : "Anonymous"}</Typography>
                    <Tooltip title="Switch user">
                    <IconButton  sx={{color:"#ffffff",'&:hover':{color:"#000000"}}} onClick={()=>{setSwitchAc(true)}}>
                        <SwitchAccountIcon/>
                    </IconButton>
                    </Tooltip>
                   </Stack>
                   
                </Box>
            </Toolbar>
            <Dialog open={SwitchAc}  onClose={()=>{setSwitchAc(false)}}>
                    <DialogContent>
                            <Box>
                                <Typography>USER</Typography>
                                <List>
                                    <ListItem>
                                        <Typography sx={{color:"gray",fontWeight:"700"}}>name</Typography>
                                    </ListItem>
                                    <Divider />
                                    <ListItem>
                                        <Button  onClick={()=>{setAddAcc(true); setSwitchAc(false)}}>NEW USER +</Button>
                                    </ListItem>
                                </List>
                            </Box>
                    </DialogContent>
            </Dialog>

            <Dialog open={AddAcc} onClose={()=>{setAddAcc(false)}}>
                    <DialogContent>
                            <Box>
                               <Input palceholder="Name" onChange={(e)=>{ e.preventDefault(); setUsername(e.target.value)}}/>
                               <Button onClick={Createuser}>Create</Button>
                               <Button onClick={()=>{setAddAcc(false)}}>Cancel</Button>
                            </Box>
                    </DialogContent>
            </Dialog>
        </AppBar>
  )
}

export default Navbar