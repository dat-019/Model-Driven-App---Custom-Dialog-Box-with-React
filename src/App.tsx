import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Stack, PrimaryButton, TextField, DatePicker, initializeIcons} from 'office-ui-fabric-react';


//initialization of icons - without calling this function icons for DatePicker would not be shown
initializeIcons();

//this interface contains description of state and properties for Dialog application
interface IABCustomDialogState {
  //text input
  text: string | undefined;
  //date input
  date: Date | undefined;
}

//this interface contains description of properties for Dialog application	 	 
export interface IABCustomDialogProps extends IABCustomDialogState {	 	 
  //current session id	 	 
  sessionId: string;	 	 
}

class ABCustomDialog extends React.Component<IABCustomDialogProps, IABCustomDialogState>{

  constructor(props: IABCustomDialogProps){
    super(props);

    //passing of data from properties to state of control during initialization
    this.state = {
        text: props.text,
        date: props.date
    };
  }

  private formatDate = (value?: Date | undefined): string => {
    if (!value)
    {
      return '';
    }

    let result = ("0" + (value.getMonth() + 1).toString()).slice(-2) + "/";
    result += ("0" + value.getDate().toString()).slice(-2) + "/";
    result += value.getFullYear().toString();

    return result;
  }

  //heart of application that returns React markup
  render(){

    return (
      <>
        <TextField
          label="Primary value"
          value={this.state.text}
          onChange={(event: any, newvalue: string | undefined) => { this.setState({ text: newvalue }); }} />
        <DatePicker
          label="Date"
          value={this.state.date}
          onSelectDate={(newValue: Date | undefined | null) => { this.setState({ date: newValue ? newValue : undefined }); }}
          formatDate={this.formatDate}
        />
        <div className="footerDiv">
          <Stack horizontal horizontalAlign={"end"} tokens={{ childrenGap: 10, padding: 10 }}>
            <PrimaryButton text="OK" onClick={() => {
              //this code on click of "OK" button serializes current value of "state"
              sessionStorage.setItem(this.props.sessionId, JSON.stringify(this.state));
              window.close();
            }} />
            <PrimaryButton text="Cancel" onClick={() => {
              //This code closes the dialog window - ATM this is the only possible way
              window.close();
            }}/>
          </Stack>
        </div>
      </>
    );

  }
}

export default ABCustomDialog;
