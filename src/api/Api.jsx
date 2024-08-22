import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Alert, Snackbar, Stack, TextField } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useSnackbar } from 'notistack';
import { Loader } from '../Loader'
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: {xs:200, sm:400, md:400},
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const columns = [


    {
        id: 'userId', label: 'Name', minWidth: 170,
        format: (value) => {
            switch (value) {
                case 1:
                    return "Qasim"
                    break;
                case 2:
                    return "Akasha"
                    break;
                case 3:
                    return "Abdullah"
                    break;
                case 4:
                    return "Maaz"
                    break;
                default:
                    return "Asad"
            }
        },
    },
    { id: 'title', label: 'Title', minWidth: 100 },
    {
        id: 'completed',
        label: 'Completed',
        minWidth: 170,
        align: 'right',
        style: 'blue',
        style2: 'red',
        format: (value) => value.toString(),
    },
    {
        id: 'button', label: 'Action', minWidth: 100, format: (value, deleteUser, updateUser, row) => {
            // console.log(row)
            return (
                <div>
                    <Button style={{ color: "green" }} onClick={() => updateUser(row)}>Update</Button>
                    {/* <Button style={{ color: "green" }} onClick={() => enqueueSnackbar('This is a mock API', { variant: 'success' })} variant='text'>Update</Button> */}
                    <Button style={{ color: "red" }} onClick={() => deleteUser(value)}>Delete</Button>
                    {/* <button style={{ color: "blue" }} onClick={() => deleteUser(value)}>Delete</button> */}
                </div>
            )
        }
    },
];


export default function StickyHeadTable() {
    const [isDataLoading, setIsDataLoading] = React.useState(false);
    const [page, setPage] = React.useState(0);
    const [search, setSearch ] = React.useState('');
    let [num, setNum] = React.useState(201);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const { enqueueSnackbar } = useSnackbar();
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleOpen2 = () => setOpen2(true);
    const handleClose = () => setOpen(false);
    const handleClose2 = () => setOpen2(false);


    const [data, setData] = React.useState([])
    const [fields, setFields] = React.useState({
        userId: '',
        title: '',
        completed: false
    })

    const [update, setUpdate] = React.useState({
        id: '',
        userId: '',
        title: '',
        completed: false
    })

    let url = "https://jsonplaceholder.typicode.com/todos";

    const fetchData = async () => {
        setIsDataLoading(true);
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        let hello = await response.json();
        // shuffle(hello);
        console.log(hello) // Print the received data in the console for debugging purposes.
        setData(hello)
        setIsDataLoading(false);
    }

    const users = (num) => {
        switch (num) {
            case 1:
                return "Qasim"
                break;
            case 2:
                return "Akasha"
                break;
            case 3:
                return "Abdullah"
                break;
            case 4:
                return "Maaz"
                break;
            default:
                return "Asad"
        }
    }

    React.useEffect(() => {
        
        fetchData();
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    function shuffle(array) {
        let currentIndex = array.length;

        // While there remain elements to shuffle...
        while (currentIndex != 0) {

            // Pick a remaining element...
            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }
    }

    let addUser = (event) => {
        event.preventDefault()
        let userId = Number(fields.userId);
        let title = fields.title;
        let completed = fields.completed;
        fetch(`https://jsonplaceholder.typicode.com/todos`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
                userId,
                title,
                completed
            })
        })
            .then((response) => {
                return response.json();
            })
            .then((user) => {

                user.id = num;
                setNum(++num)
                setData(values => {
                    return ([...values, user]);
                });
                console.log(user)
            })
            .catch(err => console.log("error is here : ", err))

        fields.userId = '';
        fields.title = '';
        fields.completed = false;

        handleClose();
    }

    let deleteUser = (num) => {
        // Sending PUT request with fetch API in javascript
        fetch(`https://jsonplaceholder.typicode.com/todos/${num}`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            method: "DELETE",
        })
            .then(function (response) {

                // Console.log(response);
                return response;
            })
            .then(function () {
                setData(values => {
                    return values.filter(value => value.id !== num);
                })
            });
    };

    let updateUser = (event) => {
        event.preventDefault()
        try {
            let userId = Number(update.userId);
            let title = update.title;
            let completed = update.completed;
            let id = Number(update.id);
            // console.log(typeof num)
            // console.log(typeof fields.id)
            // const user = data.find(user => user.id == num)
            // console.log(user)
            fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: "PATCH",
                body: JSON.stringify({
                    id,
                    userId,
                    title,
                    completed
                })
            })
                .then((response) => {
                    console.log(response)
                    return response.json();
                })
                .then((user) => {
                    console.log("i am here", user)
                    console.log(data)
                    setData(values => {
                        return values.map(item => item.id === id ? user : item);
                    });
                })
            update.userId = '';
            update.title = '';
            update.completed = false;

            handleClose2();
        } catch (error) {
            console.log("eror")
        }
    }

    const handleChange = (event) => {
        event.preventDefault()
        const { name, value } = event.target;
        const newValue = value === 'true' ? true : value === 'false' ? false : value;
        console.log(newValue)
        return setFields((prev) => ({
            ...prev,
            [name]: newValue,
        }));
    };

    const handleChange2 = (event) => {
        event.preventDefault()
        const { name, value } = event.target;
        const newValue = value === 'true' ? true : value === 'false' ? false : value;
        console.log(newValue)
        return setUpdate((prev) => ({
            ...prev,
            [name]: newValue,
        }));
    };

    const prevUpdate = (row) => {
        const { userId, id, title, completed } = row;


        setUpdate(prev => ({
            ...prev,
            userId: userId.toString(),
            id: id,
            title: title,
            completed: completed,
        }))
        // setUpdate()

        // setUpdate(row)
        console.log(update)
        handleOpen2();
    }

    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    }));

    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        width: '100%',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            [theme.breakpoints.up('sm')]: {
                width: '12ch',
                '&:focus': {
                    width: '20ch',
                },
            },
        },
    }));

    const search_parameters = Object.keys(Object.assign({}, ...data));
    console.log(search_parameters)

    function searching(data) {

        return data.filter((data) =>
    
            search_parameters.some((param) =>
    
            data[param].toString().toLowerCase().includes(search)
    
          )
    
        );
    }

    return (
        <>
            {isDataLoading ? <Loader /> : <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <h1 style={{ textAlign: "center" }}>TODO List</h1>
                <Box sx={{display:"flex", justifyContent:"space-around", gap:5}}>
                <Box sx={{flex:1}} >
                <TextField
  id="standard-basic"
  label="Search"
  variant="standard"
  value={search}
  onChange={(event) => setSearch(event.target.value)}
  sx={{
    width: {xs:"100%", md:'50%'},
    backgroundColor: '#f0f0f0',
    borderRadius: '4px',
  }}
/>

                </Box>
                <Button onClick={handleOpen} variant={'contained'} style={{ float: 'right' }}>Add Task</Button> 
                </Box><br />
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    
                >
                    <Box sx={style} >
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Description of Task
                        </Typography>
                        <Typography id="modal-modal-description" component={'span'} sx={{ mt: 2 }} >
                            <form action="" onSubmit={addUser}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Name</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        name='userId'
                                        value={fields.userId}
                                        label="Age"
                                        onChange={handleChange}
                                    >
                                        <MenuItem name='Age' value={1}>Qasim</MenuItem>
                                        <MenuItem name='Age' value={2}>Akasha</MenuItem>
                                        <MenuItem name='Age' value={3}>Abdullah</MenuItem>
                                        <MenuItem name='Age' value={4}>Maaz</MenuItem>
                                        <MenuItem name='Age' value={5}>Asad</MenuItem>
                                    </Select><br />
                                </FormControl><br />
                                <TextField id="title" label="title" name='title' variant="standard" value={fields.title} onChange={handleChange} /> <br /> <br /> <br />
                                <FormControl>
                                    <FormLabel id="demo-controlled-radio-buttons-group">Status</FormLabel>
                                    <RadioGroup
                                        aria-labelledby="demo-controlled-radio-buttons-group"
                                        name="completed"
                                        value={fields.completed.toString()}
                                        onChange={handleChange}
                                    >
                                        <FormControlLabel value='true' control={<Radio />} label="completed" />
                                        <FormControlLabel value='false' control={<Radio />} label="pending" />
                                    </RadioGroup><br />
                                    <Box sx={{ display: "flex", gap: 3 }}>
                                        <Button type='submit' variant={'contained'}>Submit</Button>
                                        <Button onClick={handleClose} variant={'contained'}>Close </Button>
                                    </Box>
                                </FormControl>
                            </form>
                        </Typography>
                    </Box>
                </Modal>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                        sx={{ backgroundColor: 'black', color: 'white' }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {searching(data)
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    // console.log(typeof row.id)
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell key={column.id} align={column.align} style={column.format && value === true
                                                        ? { color: column.style }
                                                        : { color: column.style2 }}>
                                                        {column.format && typeof value === 'boolean'
                                                            ? column.format(value)
                                                            : column.format && typeof value === 'number' ? column.format(value) : column.format ? column.format(row.id, deleteUser, prevUpdate, row) : value}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />



                <Modal
                    open={open2}
                    onClose={handleClose2}
                    aria-labelledby="modal-modal-title2"
                    aria-describedby="modal-modal-description2"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title2" variant="h6" component="h2">
                            Update Info
                        </Typography> <br />
                        <Typography id="modal-modal-description2" component={'span'} sx={{ mt: 2 }}>
                            <form action="" onSubmit={updateUser}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Name</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        name='userId'
                                        value={update.userId}
                                        label="Age"
                                        onChange={handleChange2}
                                    >
                                        <MenuItem value={1}>Qasim</MenuItem>
                                        <MenuItem value={2}>Akasha</MenuItem>
                                        <MenuItem value={3}>Abdullah</MenuItem>
                                        <MenuItem value={4}>Maaz</MenuItem>
                                        <MenuItem value={5}>Asad</MenuItem>
                                    </Select><br />
                                </FormControl><br />
                                <TextField id="title" label="title" name='title' variant="standard" value={update.title} onChange={handleChange2} />
                                {/* <TextField id="title" label="title" name='title' variant="standard" value={update.id} onChange={handleChange2} />  */}
                                <br /> <br />
                                <FormControl>
                                    <FormLabel id="demo-controlled-radio-buttons-group">Status</FormLabel>
                                    <RadioGroup
                                        aria-labelledby="demo-controlled-radio-buttons-group"
                                        name="completed"
                                        value={update.completed.toString()}
                                        onChange={handleChange2}
                                    >
                                        <FormControlLabel value='true' control={<Radio />} label="completed" />
                                        <FormControlLabel value='false' control={<Radio />} label="pending" />
                                    </RadioGroup><br />
                                    <Box sx={{ display: "flex", gap: 3 }}>
                                        <Button type='submit' variant={'contained'}>Update</Button>
                                        <Button onClick={handleClose2} variant={'contained'}>Close </Button>
                                    </Box>
                                </FormControl>
                            </form>
                        </Typography>
                    </Box>
                </Modal>
            </Paper>}
        </>

    );
}
