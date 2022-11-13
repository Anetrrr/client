import React, {useEffect, useState} from 'react';
import { TextField, Button, Typography, Paper} from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';

import makeStyles from './styles';
import { createPost, updatePost } from '../../actions/posts'


const Form = ( {currentId, setCurrentId }) => {
    

    const [ postData, setPostData] = useState({creator: "", title: '', message: '', tags: '', selectedFile: ''})
        
    const post = useSelector((state)=> currentId ? state.posts.find((p)=> p._id === currentId) :null)  
    
    const classes = makeStyles();
    const dispatch = useDispatch();
    
    useEffect(() => {
        if(post) setPostData(post);
    }, [post])

const handleSubmit = (e) => {
    e.preventDefault();
    if (currentId){
        dispatch(updatePost(currentId, postData))
    }else {
        dispatch(createPost(postData));
    }
        

    console.log('just clicked me')

    dispatch(createPost(postData, setPostData));
    clear()

}
//to clear form 
const clear = () => {
    // Inputmessage.value = ''
    // Inputcreator.value = ''
    // Inputtag.value = ''
    // Inputtitle.value = ''

    setCurrentId(null)
    setPostData({creator: "", title: '', message: '', tags: '', selectedFile: ''})

}


  
    return (
        <Paper className={classes.paper}>
            <form autoComplete='off'  noValidate className={`${classes.root} ${classes.form} `} onSubmit={handleSubmit} id='frm'>
                <Typography variant='h6'>Creating a Memory</Typography>
                <TextField variant='outlined' name='creator' label='Creator' fullWidth 
                id='creatorInput'
                value={postData.creator}
                onChange={(e) => setPostData({...postData, creator: e.target.value})}
                />
                <TextField variant='outlined' name='creator' label='Message' fullWidth 
                id='messageInput'
                value={postData.message} onChange={(e) => setPostData({...postData, message: e.target.value})}/>
                <TextField variant='outlined' name='creator' label='Title' fullWidth 
                id='titleInput'
                value={postData.title} onChange={(e)=> setPostData({...postData, title: e.target.value})}/>
                <TextField variant='outlined' name='creator' label='Tags' fullWidth 
                id='tagInput'
                value={postData.tags}
                onChange={(e)=> setPostData({...postData, tags: e.target.value})}/>
                <div className={classes.fileInput} id='fileInput'>
                <FileBase 
                    type='file'
                    multiple={false}
                    
                    onDone={({base64})=> setPostData({...postData, selectedFile: base64})}></FileBase>


                </div>
                <Button className={classes.buttonSubmit} variant='contained' color='primary' size='large' type='submit' fullWidth>Submit</Button>
                <Button className={classes.buttonSubmit} variant='contained' color='secondary' size='large' onClick={clear} fullWidth>Clear</Button> 
            </form>


        </Paper>
    )
}

export default Form;