import React, {useEffect } from 'react';

const SoundReminder = () => {

    useEffect(() => {

        //set sound reminder that remind you that task ongoing more than startNotificationAfterMin
        const startNotificationAfterMin = 60;
        const notificationIntervalMin = 7;
        let intervalId;
        let soundReminderControl = document.getElementById("sound-reminder");
        soundReminderControl.volume = 0.3;
        let timeoutId = setTimeout(()=> {
            soundReminderControl.play();
            intervalId = setInterval(function () {
                soundReminderControl.play();
            }, notificationIntervalMin * 60 * 1000);
        },startNotificationAfterMin * 60 * 1000);

        return () => {
            clearInterval(intervalId);
            clearTimeout(timeoutId);
        }
    },[]);



    return (
        <audio style={{display:"none"}} id="sound-reminder" src="media/Sound_11344.wav" controls ></audio>

    )
};

export default SoundReminder;