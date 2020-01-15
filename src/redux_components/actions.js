export const onSerfing = (payload) => ({type:'OnSerfing', payload});
export const onGoToPrev = () => ({type:'onGoToPrev'});
export const onGoToHome = () => ({type:'onGoToHome'});
export const openCreateFolderForm = () => ({type:'openCreateFolderForm'});
export const closeAllModalWindow = () => ({type:'closeAllModalWindow'});
export const CreateNewFolder = (payload) => ({type:'CreateNewFolder',payload});
export const openCreateNewTaskForm = () => ({type:'openCreateNewTaskForm'});
export const CreateNewTask = (payload) => ({type:'CreateNewTask',payload});
export const setTasks = (payload) => ({type:'setTasks',payload});
export const setFileSystemItems = (payload) => ({type:'setFileSystemItems',payload});
export const setStore = (payload) => ({type:'setStore',payload});
export const startTask = (payload) => ({type:'startTask',payload});
export const increaseTemporaryIdForTask = () => ({type:'increaseTemporaryIdForTask'});
export const changeStatusAndSetIdForTaskByTemporaryId = (payload) => ({type:'changeStatusAndSetIdForTaskByTemporaryId',payload});
export const setOngoingTasks = (payload) => ({type:'setOngoingTasks',payload});
export const setTimeTask = (payload) => ({type:'setTimeTask',payload});
export const setSwitchableOngoingTask = (payload) => ({type:'setSwitchableOngoingTask',payload});
export const setDateRange = (payload) => ({type:'setDateRange',payload});
export const setDateRangeStartDate = (payload) => ({type:'setDateRangeStartDate',payload});
export const setDateRangeEndDate = (payload) => ({type:'setDateRangeEndDate',payload});
export const setStatChartsTaskArr = (payload) => ({type:'setStatChartsTaskArr',payload});
export const pushOrRemIdForStatChartTaskArr = (payload) => ({type:'pushOrRemIdForStatChartTaskArr',payload});


