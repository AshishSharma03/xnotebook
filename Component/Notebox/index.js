import { Card, CardContent, Container, Grid, Typography, Stack, CardActionArea, IconButton,Input,Box ,Pagination, Dialog, DialogContent, Button, TextField} from '@mui/material'
import React ,{useState,useEffect} from 'react'
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import PushPinIcon from '@mui/icons-material/PushPin';
import DeleteIcon from '@mui/icons-material/Delete';
import { query,collection,orderBy,getDocs, onSnapshot, doc,deleteDoc } from 'firebase/firestore';
import { db } from '../../database/firebase';
import { useSelector } from 'react-redux';




const Boxses = ({ id,Title, Tagline, Note ,Origin, latest,background,color}) => {

    const [noteveiw, setnoteveiw] = useState(false)
    const user = useSelector(state => state.user)
    const Delete = async (id,e) =>{

        if(user.length > 0){
            const l = doc(db,`${user[0].User}/${id}`);
            await deleteDoc(l);
            
        }else{
            const l = doc(db,`Notes/${id}`);
            await deleteDoc(l);

        }
    }


    return (
        <>
        <Card sx={{background:background,boxShadow:"0px 0px 100px 1px rgba(204,230,225,0.1)"}}>
            <CardActionArea onClick={()=>{setnoteveiw(true)}}>
                <CardContent>
                    <Stack direction={"row"} spacing={1} alignItems="center">
                        <Typography sx={{ fontSize: "20px", fontWeight: "800", flexGrow: 1}}>{Title}</Typography>
                        <Typography sx={{fontSize:"10px",fontWeight:'600'}}>{Origin}</Typography>
                    </Stack>
                </CardContent>

                <CardContent>
                    <Stack direction={"row"} spacing={1}>
                        <LocalOfferIcon sx={{color:color}} /><Typography sx={{fontWeight:"700",color:color}}>{Tagline}</Typography>
                    </Stack>
                    <Stack direction="row">
                    </Stack>
                </CardContent>
            </CardActionArea>
            <CardContent>
                <Stack direction={'row'} alignItems="center">

                    <Typography sx={{ flexGrow: 1 ,fontSize:"10px"}}>Last update : {latest} </Typography>
                    <IconButton sx={{color:"#ffffff",'&:hover':{color:"green"}}}>
                        <PushPinIcon />
                    </IconButton>
                    <IconButton sx={{color:"#ffffff",'&:hover':{color:"red"}}} onClick={()=>{Delete(id)}}>
                        <DeleteIcon />
                    </IconButton>
                </Stack>
            </CardContent>
        </Card>
        <Dialog open={noteveiw} onClose={()=>{setnoteveiw(false)}}>
                <Box sx={{backgroundColor:background,height:"10px"}}/>
            <DialogContent>
                <Box sx={{padding:"20px",width:{md:"500px"},height:"100%"}}>
                    <Stack gap={1}>
                    <Input disableUnderline value={Title} sx={{fontSize:"30px",fontWeight:"600"}}/>
                    <Typography sx={{color:"#D8D8D8"}}>{Origin}</Typography>
                    <Input disableUnderline  value={Tagline} sx={{color:color,fontSize:"20px"}}/>
                    <TextField multiline   disableUnderline={false} sx={{"& fieldset":{border:"none"}}}  value={Note} />
                    <Stack direction={"row"} gap={1}>
                    <Button onClick={()=>{setnoteveiw(false)}} >Cancel</Button>
                    <Button sx={{color:"green"}} onClick={()=>{}}>Edit</Button>
                    <Button sx={{color:"red"}} onClick={()=>{Delete(id)}}>Delete</Button>
                    </Stack>
                    </Stack>
                </Box>
            </DialogContent>
        </Dialog>
        </>
        
        )
}


function NoteBox() {
        const [state, setstate] = useState([]);
        const user = useSelector(state => state.user)
        // console.log(user)
        
        const Color = [
            {background:"#D9ECFF" , tagColor:"#5E88B1"},
            {background:"#D9FFEF" , tagColor:"#5EB1A1"},
            {background:"#FFF14B" , tagColor:"#C7BD41"},
            {background:"#FFA076" , tagColor:"#DC6937"},
            {background:"#FF97F8" , tagColor:"#DE37D2"},
            {background:"#E5B0FF" , tagColor:"#C652FF"},
                    ]


        // useEffect( ()=>{
            
            if(user.length > 0){
                
                const q = query(collection(db,`${user[0].User}`))
                // console.log(q)
                const cols = onSnapshot(q,(querySnapshot)=>{
                    setstate(querySnapshot.docs.map(doc =>({...doc.data(),id:doc.id,title:doc.Title})))
                })
                // console.log(cols)
                
            }else{

                const q = query(collection(db,`Notes`))
                // console.log(q)
                const cols = onSnapshot(q,(querySnapshot)=>{
                    setstate(querySnapshot.docs.map(doc =>({...doc.data(),id:doc.id,title:doc.Title})))
                })
                // console.log(cols)
                

            }
            
            
        
    // },[])
    
    // console.log(state)
        
    if(state.length == 0){
        return (<Container maxWidth="xl" sx={{display:'flex',justifyContent:"center",alignItems:"center",height:"90vh"}}>
                <Typography sx={{fontSize:"25px",fontWeight:"700",color:"#D1D1D1",textAlign:"center"}}>Click On Button Right Corner For Create Note.</Typography>
        </Container>)
    }

        return (
        
            <Container maxWidth="md" >
                
                <Box sx={{paddingTop:"80px"}}>
                <Grid container spacing={2}>

                    {state.map((a,i) => {
                        if(i<6){
                            return (<React.Fragment key={a.id}><Grid item xs={12} md={4} sm={6}> <Boxses id={a.id} Title={a.Title} background={Color[i].background} color={Color[i].tagColor}  Tagline={a.Tagline} Note={a.Text} Origin={a.Date} latest={a.UpdateDate} /></Grid></React.Fragment>)
                        }
                    })}
                </Grid>
                </Box>
    
                {(state.length > 6)?
                <Box sx={{display:"flex",justifyContent:"center",padding:"20px"}}>
                <Pagination  count={2}   />
                </Box>
                :""
                }
            </Container>
        )
    


    
}

export default NoteBox