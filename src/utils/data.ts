import { SweetAlertIcon } from "sweetalert2"

export type ScoreState = {
    id: number | void,
    score: number | void,
    getScore: (score: number | void, id: number | void) => void,
}

export type LoginResponse = {
  success : {
    title: string,
    text: string,
    icon: SweetAlertIcon,
    confirmButtonColor: string,
    confirmButtonText: string  
  },
  failed: {
    title: string,
    text: string,
    icon: SweetAlertIcon,
    confirmButtonColor: string,
    confirmButtonText: string  
  }
}

export type LogoutResponse = {
    title: string,
    text: string,
    icon: SweetAlertIcon 
    showCancelButton: boolean,
    confirmButtonText: string,
    confirmButtonColor: string,
    cancelButtonText: string,
    reverseButtons: boolean,
    isConfirmed: {
        title: string,
        confirmButtonColor: string,
    } 
}


export type ActionResponse = {
  success: {
    title: string,
    text: string,
    icon: SweetAlertIcon,
    confirmButtonColor: string,
    confirmButtonText: "OK"
  },
  failed : {
    title: string,
    text: string,
    icon: SweetAlertIcon,
    confirmButtonColor: string,
    confirmButtonText: "OK"
  }
}

export type Answer = {
  id: string;
  attempt_id: string;
  question_id: number;
  description: string;
  score: number;
  created_at: string;
  updated_at: string;
  question: {
    id: number;
    type: string;
    question: string;
    description: string;
    url_video: string;
    section: string;
    choices: any; 
    goto: any; 
  };
};