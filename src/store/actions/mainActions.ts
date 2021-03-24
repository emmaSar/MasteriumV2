import { LoginTypes, MainTypes, OrdersTypes } from "../constants"

export const setVisibleDrawer = (visible: boolean) => {
	return {
		type: MainTypes.SET_DRAWER_VISIBLE,
		payload:visible,
	};
};
export const setUplodFile = (payload: any) => {
	return {
		type: MainTypes.SET_UPLOAD_FILE,
		payload:payload,
	};
};
export const uplodFile = (payload: any) => {
	return {
		type: MainTypes.UPLOAD_FILE,
		payload:payload,
	};
};
export const setOpen = (visible: number) => {
	return {
		type: MainTypes.SET_OPEN,
		payload:visible,
	};
};
export const setDay = (payload: string) => {
	return {
		type: MainTypes.SET_DAY,
		payload,
	};
};

export const setIndex = (payload: number|undefined) => {
	return {
		type: MainTypes.SET_INDEX,
		payload,
	};
};
export const setBottomIndex = (payload: number) => {
	return {
		type: MainTypes.SET_BOTTOM_INDEX,
		payload,
	};
};
export const getUrl = (payload: any) => {
	
	return {
		type: MainTypes.GET_URL,
		payload,
	};
};
export const setUrl = (payload: any) => {
	return {
		type: MainTypes.SET_URL,
		payload,
	};
};
export const setCompanyType = (payload: any) => {
	return {
		type: MainTypes.SET_COMPANY_TYPE,
		payload,
	};
};
export const getAddresses = () => {
	return {
		type: MainTypes.GET_ADDRESSES,
		
	};
};
export const setAddresses = (payload: any) => {
	return {
		type: MainTypes.SET_ADDRESSES,
		payload,
	};
};
export const setPrimaryAddress = (payload: any) => {
	return {
		type: MainTypes.SET_PRIMARY_ADDRESS,
		payload,
	};
};
export const addAddress = (payload: any) => {
	return {
		type: MainTypes.ADD_ADDRESS,
		payload,
	};
};
export const getMyMasters = () => {
	return {
		type: MainTypes.GET_MY_MASTERS,
		
	};
};
export const setMyMasters = (payload:any) => {
	return {
		type: MainTypes.SET_MY_MASTERS,
		payload
	};
};
export const deleteMyMasterById = (payload:number) => {
	return {
		type: MainTypes.DELETE_MY_MASTER_BY_ID,
		payload
	};
};
export const getHelp = () => {
	return {
		type: MainTypes.GET_HELP,
	};
};
export const setHelp = (payload:any) => {
	return {
		type: MainTypes.SET_HELP,
		payload
	};
};
export const addFriend = (payload:any) => {
	return {
		type: MainTypes.ADD_FRIEND,
		payload
	};
};
export const setFriends = (payload:any) => {
	return {
		type: MainTypes.SET_FRIENDS,
		payload
	};
}
export const getFriends = () => {
	return {
		type: MainTypes.GET_FRIENDS,

	};
}
export const setLoading = (payload:boolean) => {
	return {
		type: MainTypes.SET_LOADING,
		payload

	};
}
export const getMe = () => {
	return {
		type: MainTypes.GET_ME,
	};
}
export const getPopularSubCategory= () => {
	return {
		type: MainTypes.GET_POPULAR_SUB_CATEGORY,
	};
}
export const setPopularSubCategory= (payload:any) => {
	return {
		type: MainTypes.SET_POPULAR_SUB_CATEGORY,
		payload
	};
}
export const getExecutorById= (payload:any) => {
	return {
		type: MainTypes.GET_EXECUTOR_BY_ID,
		payload
	};
}
export const setExecutor= (payload:any) => {
	return {
		type: MainTypes.SET_EXECUTOR,
		payload
	};
}
export const addExecutor= (payload:any) => {
	return {
		type: MainTypes.ADD_EXECUTOR,
		payload
	};
}
export const addCreditCard= (payload:any) => {
	return {
		type: MainTypes.ADD_CREDIT_CARD,
		payload
	};
}
export const checkCode= (payload:any) => {
	return {
		type: MainTypes.CHECK_CODE,
		payload
	};
}
export const getCreditCards= (payload:any) => {
	return {
		type: MainTypes.GET_CREDIT_CARDS,
		payload
	};
}
export const setCreditCards= (payload:any) => {
	return {
		type: MainTypes.SET_CREDIT_CARDS,
		payload
	};
}
export const setErrorMessage= (payload:boolean) => {
	return {
		type: MainTypes.SET_ERROR_MESSAGE,
		payload
	};
}
export const setNextReviews= (payload:any) => {
    return {
        type:MainTypes.SET_NEXT_REVIEWS ,
        payload
    };
};
export const getRoomForUser= (payload:any) => {
    return {
        type:MainTypes.GET_ROOM_FOR_USER ,
        payload
    };
};
export const setChatUserId= (payload:any) => {
    return {
        type:MainTypes.SET_CHAT_USER_ID ,
        payload
    };
};
export const setElement= (payload:any) => {
    return {
        type:MainTypes.SET_ELEMENT,
        payload
    };
};
export const getUnseenMessageCount= () => {
    return {
        type:MainTypes.GET_UNSEEN_MESSAGE_COUNT,
    };
};
export const getUnseenNotificationCount= () => {


    return {
        type:MainTypes.GET_UNSEEN_NOTIFICATION_COUNT,
    };
};
export const setUnseen= (payload:any) => {
    return {
        type:MainTypes.SET_UNSEEN,
		payload
    };
};
export const getMyNotification= () => {
    return {
        type:MainTypes.GET_MY_NOTIFICATION,
    };
};
export const setNotifications= (payload:any) => {
    return {
        type:MainTypes.SET_NOTIFICATIONS,
		payload
    };
};
export const getNextNotifications= (payload:any) => {
    return {
        type:MainTypes.GET_NEXT_NOTIFICATIONS,
		payload
    };
};
export const setNextNotifications= (payload:any) => {
    return {
        type:MainTypes.SET_NEXT_NOTIFICATIONS,
		payload
    };
};
export const setLanguage= (payload:any) => {
    return {
        type:MainTypes.SET_LANGUAGE,
		payload
    };
};
export const downloadFile= (payload:any) => {
    return {
        type:MainTypes.DOWNLOAD_FILE,
		payload
    };
};
export const setMessageSeeen= (payload:any) => {
    return {
        type:MainTypes.SET_MESSAGE_SEEN ,
        payload
    };
};
export const getAdminPhone= () => {
    return {
        type:MainTypes.GET_ADMIN_PHONE ,
    };
};
export const setAdminPhone= (payload:any) => {
    return {
        type:MainTypes.SET_ADMIN_PHONE ,
        payload

    };
};

