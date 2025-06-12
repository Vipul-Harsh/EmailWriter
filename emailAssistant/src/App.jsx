import { useState } from 'react'

import './App.css'
import { Box, Button, CircularProgress, Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import axios from 'axios';

function App() {
  const [emailContent,setEmailContent]= useState('');
  const [tone, setTone] = useState('');
const [generatedReply, setGeneratedReply] = useState('');
const [error, setError] = useState('');
const [loading, setLoading] = useState(false);
const handleSubmit = async () => {
    setLoading(true);
    setError(' ');
    try{
const response=await axios.post("http://localhost:8080/api/email/generate",{
  emailContent,
  tone
});
setGeneratedReply(typeof response.data === 'string' ? response.data : JSON.stringify(response.data));
    }catch(error){
      setError("Failed to generate email . tryy agin later");
      console.log(error);

    }finally{
      setLoading(false);
    }
};

  return (
    <>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant='h3' component="h1" gutterBottom>
          Email Reply Generator
        </Typography>
        <Box sx={{mx:3}}>
          <TextField
             fullWidth
             multiline
             rows={6}
             variant='outlined'
             label='Email Content'
             value={emailContent||'' }
             onChange={(e) => setEmailContent(e.target.value)}
             sx={{mb:2}}/>
             <FormControl fullWidth sx={{mb:2}}>
              <InputLabel id="tone-label">Tone (Optional)</InputLabel>
              <Select
                value={tone || ''}
                label={'Tone (Optional)'}
                onChange={(e) => setTone(e.target.value)}>
                  <MenuItem value=" None">None</MenuItem>
                  <MenuItem value="Professional">Professional</MenuItem>
                  <MenuItem value="Friendly">Friendly</MenuItem>
                  <MenuItem value="Casual">Casual</MenuItem>
                  
              </Select>
             </FormControl>
             <Button
             variant='contained'
            fullWidth
             onClick={handleSubmit}
             disabled={!emailContent || loading}>
             {loading ? <CircularProgress size={24} /> : 'Generate Reply'}
             
              
             </Button>

             
        </Box>
        {error && (
          <Typography color='error' sx={{mb:2}}>
          {error}
        </Typography>
        )}
        {generatedReply &&(
          <Box sx={{mt:3}}>
          <Typography variant='h6' gutterBottom>
            Generated reply
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={6}
            variant='outlined'
            value={generatedReply || ''}
            InputProps={{readOnly:true}}
            />
            <Button
             variant='outlined'
             sx={{mt:2}}
             onClick={()=>navigator.clipboard.writeText(generatedReply)}>
              Copy to clipboard
             </Button>
            
          </Box>
        )}
      </Container>
        
    </>
  )
}

export default App
