import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import {useState} from 'react'
import {useDeploy} from './hooks/useDeploy'

const DeployForm = () => {

  const [envName, setEnvName] = useState('')
  const [version, setVersion] = useState('')
  const [bootstrapperVersion, setBootstrapperVersion] = useState("")
  const [updater, setUpdater] = useState(false)


  const {data, deploy, isPending, error} = useDeploy()

  const handleSubmit = (e) => {
    e.preventDefault()
    const fetchUrl = "https://gitlab.com/api/v4/projects/42898999/ref/main/trigger/pipeline?token=glptt-f3fd72a3e2e4eab5402c637e40bb1d6ed02e94a7"
    const reqConfig = {
      method: "POST",
      variables: {
        ENV: envName,
        VERSION: version,
        BOOTSTRAPPER_VERSION: bootstrapperVersion,
        updater
      }
    }
    deploy(fetchUrl, reqConfig)

  }


  return (

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{

            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >

          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              value={envName}
              onChange={(e) => setEnvName(e.target.value)}
              margin="normal"
              required
              fullWidth
              id="envname"
              label="Environment Name"
              name="envname"
              autoComplete="off"
              autoFocus
            />
            <TextField
              value={version}
              onChange={(e) => setVersion(e.target.value)}
              margin="normal"
              required
              fullWidth

              name="appversion"
              label="App Version"

              id="appversion"
              autoComplete="off"
            />
            <TextField
              value={bootstrapperVersion}
              onChange={(e) => setBootstrapperVersion(e.target.value)}
              margin="normal"

              fullWidth
              id="bootstrapperversion"
              label="Bootstrapper Version"
              name="bootstrapperversion"
              autoComplete="off"

            />
            <FormControlLabel
                control={<Checkbox checked={updater} name="update" color="primary" />}
                label="Updat DBs"
              />

          {!isPending && <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign up
            </Button>}

            {isPending && <Button
              type="submit"
              fullWidth
              disabled
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Loading...
            </Button>}
            {error && <Typography>{error}</Typography>}

          </Box>
          {data && <p>there is data</p>}
        </Box>
      </Container>

  );

}

export default DeployForm
