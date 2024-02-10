import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

export const ActionType = {
    RECEIVE_TALK_DETAIL: 'RECEIVE_TALK_DETAIL',
    CLEAR_TALK_DETAIL: 'CLEAR_TALK_DETAIL',
    TOGGLE_LIKE_TALK_DETAIL: 'TOGGLE_LIKE_TALK_DETAIL'
};

export function receiveTalkDetailActionCreator(talkDetail) {
    return {
        type: ActionType.RECEIVE_TALK_DETAIL,
        payload: {
            talkDetail
        }
    };
}

export function clearTalkDetailActionCreator() {
    return {
        type: ActionType.CLEAR_TALK_DETAIL
    };
}

export function toggleLikeTalkDetailActionCreator(userId) {
    return {
        type: ActionType.TOGGLE_LIKE_TALK_DETAIL,
        payload: {
            userId
        }
    };
}

export function asyncReceiveTalkDetail(talkId) {
    return async (dispatch) => {
        dispatch(showLoading());
        dispatch(clearTalkDetailActionCreator());

        try {
            const talkDetail = await api.getTalkDetail(talkId);

            dispatch(receiveTalkDetailActionCreator(talkDetail));
        } catch (error) {
            alert(error.message);
        }

        dispatch(hideLoading());
    };
}

export function asyncToggleLikeTalkDetail() {
    return async (dispatch, getState) => {
        dispatch(showLoading());

        const { authUser: { id: userId }, talkDetail: { id: talkId } } = getState();

        dispatch(toggleLikeTalkDetailActionCreator(userId));
        try {
            await api.toggleLikeTalk(talkId);
        } catch (error) {
            alert(error.message);
        }

        dispatch(hideLoading());
    };
}