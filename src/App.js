import React from 'react';
import './App.css';
import FileInput from "./components/FileInput";
import { startDrawing } from "./Particles";
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import Statistic from "./components/Statistic";
import CountUp from "react-countup";


class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      isFileLoaded: false,
      isFileLoading: false,
      loadingProgress: 0,
      parsedData: ''
    }
  }

  componentDidMount() {
    toast.configure({
      autoClose: 1000,
      draggable: true
    });
    this.loop = startDrawing();
    this.loop({ turnOnLoop: true});
    this.loop({ turnOnLoop: false}, {x : 30, y: 30});
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { position } = this.props;
    this.loop({ turnOnLoop: false}, position);
  }

  sendFile = (file, input) => {
    let { name } = file
    let format = name.slice(name.length - 4)
    if (format !== 'xlsx') {
      toast.error('File must be in XLSX format!')
      input.value = '';
    } else {
      toast.info('File is uploading!')
      const data = new FormData();
      data.append('file', file);
      axios.post('https://stark-reef-89455.herokuapp.com/convert', data, {})
        .then(res => {
          if (res.status === 200) {
            toast.info('File uploaded!')
            input.value = '';
            this.setState({
              isFileLoaded: true,
              isFileLoading: false,
              parsedData: res.data
            })

          } else {
            toast.error('There is error on the server')
            input.value = '';
          }
        })
      this.setState({
        isFileLoading: true
      })
    }
  }

  render = () => {
    const { isFileLoaded, isFileLoading, parsedData } = this.state;
    return (
      <div className='app'>
        <ToastContainer />
        <canvas id='particles'></canvas>
        { !isFileLoaded ?
          <FileInput
            sendFile={this.sendFile}
            isFileLoading={isFileLoading}
          />
          :
          <Statistic
            parsedData={parsedData}
          />
        }
      </div>
    )
  }
}

export default App;
