import { Button, Dialog,DialogActions,DialogContent,DialogTitle,Fab,Input,Stack,Box, TextField } from '@mui/material'
import React,{useState,useEffect} from 'react'
import EditIcon from '@mui/icons-material/Edit';
import { query,addDoc,collection } from 'firebase/firestore';
import { db } from '../../database/firebase';

import { useSelector } from 'react-redux';

function Editor() {

  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
  ];
  var d = new Date();
  var Date_ = `${d.getDate()+ " "+monthNames[d.getMonth()]+" "+d.getFullYear()}`
  var UpdateDate_ = `${d.getDate()+ " "+monthNames[d.getMonth()]+" "+d.getFullYear()}`
  const [open,setopen] = useState(false)
  const [title,setTitle] = useState({Title:''});
  const [Tagline,setTagline] = useState({Tagline:''});
  const [Text,setText] = useState({Text:''});
  const [date,setDate] = useState({Date:Date_})
  const [dateUp,setDateUp] = useState({UpdateDate:UpdateDate_})
  const user =  useSelector(state => state.user)
  

   
    
    const onSubmit = async()=>{
      setDate({Date: Date_})
      setDateUp({UpdateDate : UpdateDate_})
    // const q = query(collection(db,`Notes/${user[0].NoteId}/${user[0].UserName}/`))
    if(user.length > 0){
    const q = query(collection(db,`${user[0].User}`))
    const docRef = await addDoc(q,{...title,...Tagline,...Text,...date,...dateUp})
  }else{
    
    const q = query(collection(db,`Notes`))
    const docRef = await addDoc(q,{...title,...Tagline,...Text,...date,...dateUp})
    }
   
  } 
  
  const handleClose = () => {
    setopen(false);
  };
  // console.log(title)

  return (
    <>
     <Fab sx={{display:'block',position:"fixed",bottom:'20px',right:'20px',backgroundColor:"#5E88B1",color:"#ffffff"}}color="secondary"  aria-label="edit" onClick={()=>{setopen(true)}}>
       <EditIcon />
    </Fab>
    <Dialog open={open} onClose={handleClose} >
      <Box sx={{background:"#FF9C9C",height:"10px"}}></Box>
      <Box sx={{padding:'20px',width:{md:"500px"}}}>
        <DialogTitle sx={{color:"#C8C8C8"}}>create note</DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
          <Input placeholder='Title' onChange={(e)=>{setTitle({Title:e.target.value})}} sx={{fontSize:"20px",fontWeight:"600"}}/>
          <Input placeholder='Tagline'  onChange={(e)=>{setTagline({Tagline:e.target.value})}}/>
          <TextField multiline  rows={5}  cols={20} onChange={(e)=>{setText({Text:e.target.value})}}  />
          </Stack>
        </DialogContent>
        <DialogActions>
        <Button onClick={()=>{setopen(false)}}>Cancel</Button>
        <Button onClick={()=>{setopen(false); onSubmit()}}>Add</Button>
        </DialogActions>
      </Box>
    </Dialog>
    </>
  )
}

export default Editor