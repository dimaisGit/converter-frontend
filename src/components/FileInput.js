import React from 'react'

class FileInput extends React.Component {
  componentDidMount() {
    const { sendFile } = this.props
    this.input = document.querySelector('.upload-btn-wrapper input[type=file]');
    this.input.addEventListener('change', () => sendFile(this.input.files[0], this.input), false);
  }

  render = () => {
    const { isFileLoading } = this.props
    return (
      <div className='input-div'>
        <div className="upload-btn-wrapper">
          <button className="btn">Upload a file</button>
          <input type="file" name="myfile" accept=".xlsx" disabled={isFileLoading}/>
        </div>
      </div>
    )
  }
}

export  default FileInput;