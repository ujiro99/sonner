'use client';
import React from 'react';
import ReactDOM from 'react-dom';

const getAsset = (type)=>{
    switch(type){
        case 'success':
            return SuccessIcon;
        case 'info':
            return InfoIcon;
        case 'warning':
            return WarningIcon;
        case 'error':
            return ErrorIcon;
        default:
            return null;
    }
};
const bars = Array(12).fill(0);
const Loader = ({ visible, className })=>{
    return /*#__PURE__*/ React.createElement("div", {
        className: [
            'sonner-loading-wrapper',
            className
        ].filter(Boolean).join(' '),
        "data-visible": visible
    }, /*#__PURE__*/ React.createElement("div", {
        className: "sonner-spinner"
    }, bars.map((_, i)=>/*#__PURE__*/ React.createElement("div", {
            className: "sonner-loading-bar",
            key: `spinner-bar-${i}`
        }))));
};
const SuccessIcon = /*#__PURE__*/ React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    height: "20",
    width: "20"
}, /*#__PURE__*/ React.createElement("path", {
    fillRule: "evenodd",
    d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z",
    clipRule: "evenodd"
}));
const WarningIcon = /*#__PURE__*/ React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    height: "20",
    width: "20"
}, /*#__PURE__*/ React.createElement("path", {
    fillRule: "evenodd",
    d: "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z",
    clipRule: "evenodd"
}));
const InfoIcon = /*#__PURE__*/ React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    height: "20",
    width: "20"
}, /*#__PURE__*/ React.createElement("path", {
    fillRule: "evenodd",
    d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z",
    clipRule: "evenodd"
}));
const ErrorIcon = /*#__PURE__*/ React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    height: "20",
    width: "20"
}, /*#__PURE__*/ React.createElement("path", {
    fillRule: "evenodd",
    d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z",
    clipRule: "evenodd"
}));
const CloseIcon = /*#__PURE__*/ React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "12",
    height: "12",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
}, /*#__PURE__*/ React.createElement("line", {
    x1: "18",
    y1: "6",
    x2: "6",
    y2: "18"
}), /*#__PURE__*/ React.createElement("line", {
    x1: "6",
    y1: "6",
    x2: "18",
    y2: "18"
}));

const useIsDocumentHidden = ()=>{
    const [isDocumentHidden, setIsDocumentHidden] = React.useState(document.hidden);
    React.useEffect(()=>{
        const callback = ()=>{
            setIsDocumentHidden(document.hidden);
        };
        document.addEventListener('visibilitychange', callback);
        return ()=>window.removeEventListener('visibilitychange', callback);
    }, []);
    return isDocumentHidden;
};

let toastsCounter = 1;
class Observer {
    constructor(){
        // We use arrow functions to maintain the correct `this` reference
        this.subscribe = (subscriber)=>{
            this.subscribers.push(subscriber);
            return ()=>{
                const index = this.subscribers.indexOf(subscriber);
                this.subscribers.splice(index, 1);
            };
        };
        this.publish = (data)=>{
            this.subscribers.forEach((subscriber)=>subscriber(data));
        };
        this.addToast = (data)=>{
            this.publish(data);
            this.toasts = [
                ...this.toasts,
                data
            ];
        };
        this.create = (data)=>{
            var _data_id;
            const { message, ...rest } = data;
            const id = typeof (data == null ? void 0 : data.id) === 'number' || ((_data_id = data.id) == null ? void 0 : _data_id.length) > 0 ? data.id : toastsCounter++;
            const alreadyExists = this.toasts.find((toast)=>{
                return toast.id === id;
            });
            const dismissible = data.dismissible === undefined ? true : data.dismissible;
            if (this.dismissedToasts.has(id)) {
                this.dismissedToasts.delete(id);
            }
            if (alreadyExists) {
                this.toasts = this.toasts.map((toast)=>{
                    if (toast.id === id) {
                        this.publish({
                            ...toast,
                            ...data,
                            id,
                            title: message
                        });
                        return {
                            ...toast,
                            ...data,
                            id,
                            dismissible,
                            title: message
                        };
                    }
                    return toast;
                });
            } else {
                this.addToast({
                    title: message,
                    ...rest,
                    dismissible,
                    id
                });
            }
            return id;
        };
        this.dismiss = (id)=>{
            if (id) {
                this.dismissedToasts.add(id);
                requestAnimationFrame(()=>this.subscribers.forEach((subscriber)=>subscriber({
                            id,
                            dismiss: true
                        })));
            } else {
                this.toasts.forEach((toast)=>{
                    this.subscribers.forEach((subscriber)=>subscriber({
                            id: toast.id,
                            dismiss: true
                        }));
                });
            }
            return id;
        };
        this.message = (message, data)=>{
            return this.create({
                ...data,
                message
            });
        };
        this.error = (message, data)=>{
            return this.create({
                ...data,
                message,
                type: 'error'
            });
        };
        this.success = (message, data)=>{
            return this.create({
                ...data,
                type: 'success',
                message
            });
        };
        this.info = (message, data)=>{
            return this.create({
                ...data,
                type: 'info',
                message
            });
        };
        this.warning = (message, data)=>{
            return this.create({
                ...data,
                type: 'warning',
                message
            });
        };
        this.loading = (message, data)=>{
            return this.create({
                ...data,
                type: 'loading',
                message
            });
        };
        this.promise = (promise, data)=>{
            if (!data) {
                // Nothing to show
                return;
            }
            let id = undefined;
            if (data.loading !== undefined) {
                id = this.create({
                    ...data,
                    promise,
                    type: 'loading',
                    message: data.loading,
                    description: typeof data.description !== 'function' ? data.description : undefined
                });
            }
            const p = Promise.resolve(promise instanceof Function ? promise() : promise);
            let shouldDismiss = id !== undefined;
            let result;
            const originalPromise = p.then(async (response)=>{
                result = [
                    'resolve',
                    response
                ];
                const isReactElementResponse = React.isValidElement(response);
                if (isReactElementResponse) {
                    shouldDismiss = false;
                    this.create({
                        id,
                        type: 'default',
                        message: response
                    });
                } else if (isHttpResponse(response) && !response.ok) {
                    shouldDismiss = false;
                    const promiseData = typeof data.error === 'function' ? await data.error(`HTTP error! status: ${response.status}`) : data.error;
                    const description = typeof data.description === 'function' ? await data.description(`HTTP error! status: ${response.status}`) : data.description;
                    const isExtendedResult = typeof promiseData === 'object' && !React.isValidElement(promiseData);
                    const toastSettings = isExtendedResult ? promiseData : {
                        message: promiseData
                    };
                    this.create({
                        id,
                        type: 'error',
                        description,
                        ...toastSettings
                    });
                } else if (response instanceof Error) {
                    shouldDismiss = false;
                    const promiseData = typeof data.error === 'function' ? await data.error(response) : data.error;
                    const description = typeof data.description === 'function' ? await data.description(response) : data.description;
                    const isExtendedResult = typeof promiseData === 'object' && !React.isValidElement(promiseData);
                    const toastSettings = isExtendedResult ? promiseData : {
                        message: promiseData
                    };
                    this.create({
                        id,
                        type: 'error',
                        description,
                        ...toastSettings
                    });
                } else if (data.success !== undefined) {
                    shouldDismiss = false;
                    const promiseData = typeof data.success === 'function' ? await data.success(response) : data.success;
                    const description = typeof data.description === 'function' ? await data.description(response) : data.description;
                    const isExtendedResult = typeof promiseData === 'object' && !React.isValidElement(promiseData);
                    const toastSettings = isExtendedResult ? promiseData : {
                        message: promiseData
                    };
                    this.create({
                        id,
                        type: 'success',
                        description,
                        ...toastSettings
                    });
                }
            }).catch(async (error)=>{
                result = [
                    'reject',
                    error
                ];
                if (data.error !== undefined) {
                    shouldDismiss = false;
                    const promiseData = typeof data.error === 'function' ? await data.error(error) : data.error;
                    const description = typeof data.description === 'function' ? await data.description(error) : data.description;
                    const isExtendedResult = typeof promiseData === 'object' && !React.isValidElement(promiseData);
                    const toastSettings = isExtendedResult ? promiseData : {
                        message: promiseData
                    };
                    this.create({
                        id,
                        type: 'error',
                        description,
                        ...toastSettings
                    });
                }
            }).finally(()=>{
                if (shouldDismiss) {
                    // Toast is still in load state (and will be indefinitely — dismiss it)
                    this.dismiss(id);
                    id = undefined;
                }
                data.finally == null ? void 0 : data.finally.call(data);
            });
            const unwrap = ()=>new Promise((resolve, reject)=>originalPromise.then(()=>result[0] === 'reject' ? reject(result[1]) : resolve(result[1])).catch(reject));
            if (typeof id !== 'string' && typeof id !== 'number') {
                // cannot Object.assign on undefined
                return {
                    unwrap
                };
            } else {
                return Object.assign(id, {
                    unwrap
                });
            }
        };
        this.custom = (jsx, data)=>{
            const id = (data == null ? void 0 : data.id) || toastsCounter++;
            this.create({
                jsx: jsx(id),
                id,
                ...data
            });
            return id;
        };
        this.getActiveToasts = ()=>{
            return this.toasts.filter((toast)=>!this.dismissedToasts.has(toast.id));
        };
        this.subscribers = [];
        this.toasts = [];
        this.dismissedToasts = new Set();
    }
}
const ToastState = new Observer();
// bind this to the toast function
const toastFunction = (message, data)=>{
    const id = (data == null ? void 0 : data.id) || toastsCounter++;
    ToastState.addToast({
        title: message,
        ...data,
        id
    });
    return id;
};
const isHttpResponse = (data)=>{
    return data && typeof data === 'object' && 'ok' in data && typeof data.ok === 'boolean' && 'status' in data && typeof data.status === 'number';
};
const basicToast = toastFunction;
const getHistory = ()=>ToastState.toasts;
const getToasts = ()=>ToastState.getActiveToasts();
// We use `Object.assign` to maintain the correct types as we would lose them otherwise
const toast = Object.assign(basicToast, {
    success: ToastState.success,
    info: ToastState.info,
    warning: ToastState.warning,
    error: ToastState.error,
    custom: ToastState.custom,
    message: ToastState.message,
    promise: ToastState.promise,
    dismiss: ToastState.dismiss,
    loading: ToastState.loading
}, {
    getHistory,
    getToasts
});

const data = "html[dir='ltr'],\n[data-sonner-toaster][dir='ltr'] {\n  --toast-icon-margin-start: -3px;\n  --toast-icon-margin-end: 4px;\n  --toast-svg-margin-start: -1px;\n  --toast-svg-margin-end: 0px;\n  --toast-button-margin-start: auto;\n  --toast-button-margin-end: 0;\n  --toast-close-button-start: 0;\n  --toast-close-button-end: unset;\n  --toast-close-button-transform: translate(-35%, -35%);\n}\n\nhtml[dir='rtl'],\n[data-sonner-toaster][dir='rtl'] {\n  --toast-icon-margin-start: 4px;\n  --toast-icon-margin-end: -3px;\n  --toast-svg-margin-start: 0px;\n  --toast-svg-margin-end: -1px;\n  --toast-button-margin-start: 0;\n  --toast-button-margin-end: auto;\n  --toast-close-button-start: unset;\n  --toast-close-button-end: 0;\n  --toast-close-button-transform: translate(35%, -35%);\n}\n\n[data-sonner-toaster] {\n  position: fixed;\n  width: var(--width);\n  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial,\n    Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;\n  --gray1: hsl(0, 0%, 99%);\n  --gray2: hsl(0, 0%, 97.3%);\n  --gray3: hsl(0, 0%, 95.1%);\n  --gray4: hsl(0, 0%, 93%);\n  --gray5: hsl(0, 0%, 90.9%);\n  --gray6: hsl(0, 0%, 88.7%);\n  --gray7: hsl(0, 0%, 85.8%);\n  --gray8: hsl(0, 0%, 78%);\n  --gray9: hsl(0, 0%, 56.1%);\n  --gray10: hsl(0, 0%, 52.3%);\n  --gray11: hsl(0, 0%, 43.5%);\n  --gray12: hsl(0, 0%, 9%);\n  --border-radius: 8px;\n  box-sizing: border-box;\n  padding: 0;\n  margin: 0;\n  list-style: none;\n  outline: none;\n  z-index: 999999999;\n  transition: transform 400ms ease;\n}\n\n@media (hover: none) and (pointer: coarse) {\n  [data-sonner-toaster][data-lifted='true'] {\n    transform: none;\n  }\n}\n\n[data-sonner-toaster][data-x-position='right'] {\n  right: var(--offset-right);\n}\n\n[data-sonner-toaster][data-x-position='left'] {\n  left: var(--offset-left);\n}\n\n[data-sonner-toaster][data-x-position='center'] {\n  left: 50%;\n  transform: translateX(-50%);\n}\n\n[data-sonner-toaster][data-y-position='top'] {\n  top: var(--offset-top);\n}\n\n[data-sonner-toaster][data-y-position='bottom'] {\n  bottom: var(--offset-bottom);\n}\n\n[data-sonner-toast] {\n  --y: translateY(100%);\n  --lift-amount: calc(var(--lift) * var(--gap));\n  z-index: var(--z-index);\n  position: absolute;\n  opacity: 0;\n  transform: var(--y);\n  touch-action: none;\n  transition: transform 400ms, opacity 400ms, height 400ms, box-shadow 200ms;\n  box-sizing: border-box;\n  outline: none;\n  overflow-wrap: anywhere;\n}\n\n[data-sonner-toast][data-styled='true'] {\n  padding: 16px;\n  background: var(--normal-bg);\n  border: 1px solid var(--normal-border);\n  color: var(--normal-text);\n  border-radius: var(--border-radius);\n  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);\n  width: var(--width);\n  font-size: 13px;\n  display: flex;\n  align-items: center;\n  gap: 6px;\n}\n\n[data-sonner-toast]:focus-visible {\n  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1), 0 0 0 2px rgba(0, 0, 0, 0.2);\n}\n\n[data-sonner-toast][data-y-position='top'] {\n  top: 0;\n  --y: translateY(-100%);\n  --lift: 1;\n  --lift-amount: calc(1 * var(--gap));\n}\n\n[data-sonner-toast][data-y-position='bottom'] {\n  bottom: 0;\n  --y: translateY(100%);\n  --lift: -1;\n  --lift-amount: calc(var(--lift) * var(--gap));\n}\n\n[data-sonner-toast][data-styled='true'] [data-description] {\n  font-weight: 400;\n  line-height: 1.4;\n  color: #3f3f3f;\n}\n\n[data-rich-colors='true'][data-sonner-toast][data-styled='true'] [data-description] {\n  color: inherit;\n}\n\n[data-sonner-toaster][data-sonner-theme='dark'] [data-description] {\n  color: hsl(0, 0%, 91%);\n}\n\n[data-sonner-toast][data-styled='true'] [data-title] {\n  font-weight: 500;\n  line-height: 1.5;\n  color: inherit;\n}\n\n[data-sonner-toast][data-styled='true'] [data-icon] {\n  display: flex;\n  height: 16px;\n  width: 16px;\n  position: relative;\n  justify-content: flex-start;\n  align-items: center;\n  flex-shrink: 0;\n  margin-left: var(--toast-icon-margin-start);\n  margin-right: var(--toast-icon-margin-end);\n}\n\n[data-sonner-toast][data-promise='true'] [data-icon] > svg {\n  opacity: 0;\n  transform: scale(0.8);\n  transform-origin: center;\n  animation: sonner-fade-in 300ms ease forwards;\n}\n\n[data-sonner-toast][data-styled='true'] [data-icon] > * {\n  flex-shrink: 0;\n}\n\n[data-sonner-toast][data-styled='true'] [data-icon] svg {\n  margin-left: var(--toast-svg-margin-start);\n  margin-right: var(--toast-svg-margin-end);\n}\n\n[data-sonner-toast][data-styled='true'] [data-content] {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n\n[data-sonner-toast][data-styled='true'] [data-button] {\n  border-radius: 4px;\n  padding-left: 8px;\n  padding-right: 8px;\n  height: 24px;\n  font-size: 12px;\n  color: var(--normal-bg);\n  background: var(--normal-text);\n  margin-left: var(--toast-button-margin-start);\n  margin-right: var(--toast-button-margin-end);\n  border: none;\n  font-weight: 500;\n  cursor: pointer;\n  outline: none;\n  display: flex;\n  align-items: center;\n  flex-shrink: 0;\n  transition: opacity 400ms, box-shadow 200ms;\n}\n\n[data-sonner-toast][data-styled='true'] [data-button]:focus-visible {\n  box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.4);\n}\n\n[data-sonner-toast][data-styled='true'] [data-button]:first-of-type {\n  margin-left: var(--toast-button-margin-start);\n  margin-right: var(--toast-button-margin-end);\n}\n\n[data-sonner-toast][data-styled='true'] [data-cancel] {\n  color: var(--normal-text);\n  background: rgba(0, 0, 0, 0.08);\n}\n\n[data-sonner-toaster][data-sonner-theme='dark'] [data-sonner-toast][data-styled='true'] [data-cancel] {\n  background: rgba(255, 255, 255, 0.3);\n}\n\n[data-sonner-toast][data-styled='true'] [data-close-button] {\n  position: absolute;\n  left: var(--toast-close-button-start);\n  right: var(--toast-close-button-end);\n  top: 0;\n  height: 20px;\n  width: 20px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  padding: 0;\n  color: var(--gray12);\n  background: var(--normal-bg);\n  border: 1px solid var(--gray4);\n  transform: var(--toast-close-button-transform);\n  border-radius: 50%;\n  cursor: pointer;\n  z-index: 1;\n  transition: opacity 100ms, background 200ms, border-color 200ms;\n}\n\n[data-sonner-toast][data-styled='true'] [data-close-button]:focus-visible {\n  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1), 0 0 0 2px rgba(0, 0, 0, 0.2);\n}\n\n[data-sonner-toast][data-styled='true'] [data-disabled='true'] {\n  cursor: not-allowed;\n}\n\n[data-sonner-toast][data-styled='true']:hover [data-close-button]:hover {\n  background: var(--gray2);\n  border-color: var(--gray5);\n}\n\n[data-sonner-toast][data-swiping='true']::before {\n  content: '';\n  position: absolute;\n  left: -100%;\n  right: -100%;\n  height: 100%;\n  z-index: -1;\n}\n\n[data-sonner-toast][data-y-position='top'][data-swiping='true']::before {\n  bottom: 50%;\n  transform: scaleY(3) translateY(50%);\n}\n\n[data-sonner-toast][data-y-position='bottom'][data-swiping='true']::before {\n  top: 50%;\n  transform: scaleY(3) translateY(-50%);\n}\n\n[data-sonner-toast][data-swiping='false'][data-removed='true']::before {\n  content: '';\n  position: absolute;\n  inset: 0;\n  transform: scaleY(2);\n}\n\n[data-sonner-toast][data-expanded='true']::after {\n  content: '';\n  position: absolute;\n  left: 0;\n  height: calc(var(--gap) + 1px);\n  bottom: 100%;\n  width: 100%;\n}\n\n[data-sonner-toast][data-mounted='true'] {\n  --y: translateY(0);\n  opacity: 1;\n}\n\n[data-sonner-toast][data-expanded='false'][data-front='false'] {\n  --scale: var(--toasts-before) * 0.05 + 1;\n  --y: translateY(calc(var(--lift-amount) * var(--toasts-before))) scale(calc(-1 * var(--scale)));\n  height: var(--front-toast-height);\n}\n\n[data-sonner-toast] > * {\n  transition: opacity 400ms;\n}\n\n[data-sonner-toast][data-x-position='right'] {\n  right: 0;\n}\n\n[data-sonner-toast][data-x-position='left'] {\n  left: 0;\n}\n\n[data-sonner-toast][data-expanded='false'][data-front='false'][data-styled='true'] > * {\n  opacity: 0;\n}\n\n[data-sonner-toast][data-visible='false'] {\n  opacity: 0;\n  pointer-events: none;\n}\n\n[data-sonner-toast][data-mounted='true'][data-expanded='true'] {\n  --y: translateY(calc(var(--lift) * var(--offset)));\n  height: var(--initial-height);\n}\n\n[data-sonner-toast][data-removed='true'][data-front='true'][data-swipe-out='false'] {\n  --y: translateY(calc(var(--lift) * -100%));\n  opacity: 0;\n}\n\n[data-sonner-toast][data-removed='true'][data-front='false'][data-swipe-out='false'][data-expanded='true'] {\n  --y: translateY(calc(var(--lift) * var(--offset) + var(--lift) * -100%));\n  opacity: 0;\n}\n\n[data-sonner-toast][data-removed='true'][data-front='false'][data-swipe-out='false'][data-expanded='false'] {\n  --y: translateY(40%);\n  opacity: 0;\n  transition: transform 500ms, opacity 200ms;\n}\n\n[data-sonner-toast][data-removed='true'][data-front='false']::before {\n  height: calc(var(--initial-height) + 20%);\n}\n\n[data-sonner-toast][data-swiping='true'] {\n  transform: var(--y) translateY(var(--swipe-amount-y, 0px)) translateX(var(--swipe-amount-x, 0px));\n  transition: none;\n}\n\n[data-sonner-toast][data-swiped='true'] {\n  user-select: none;\n}\n\n[data-sonner-toast][data-swipe-out='true'][data-y-position='bottom'],\n[data-sonner-toast][data-swipe-out='true'][data-y-position='top'] {\n  animation-duration: 200ms;\n  animation-timing-function: ease-out;\n  animation-fill-mode: forwards;\n}\n\n[data-sonner-toast][data-swipe-out='true'][data-swipe-direction='left'] {\n  animation-name: swipe-out-left;\n}\n\n[data-sonner-toast][data-swipe-out='true'][data-swipe-direction='right'] {\n  animation-name: swipe-out-right;\n}\n\n[data-sonner-toast][data-swipe-out='true'][data-swipe-direction='up'] {\n  animation-name: swipe-out-up;\n}\n\n[data-sonner-toast][data-swipe-out='true'][data-swipe-direction='down'] {\n  animation-name: swipe-out-down;\n}\n\n@keyframes swipe-out-left {\n  from {\n    transform: var(--y) translateX(var(--swipe-amount-x));\n    opacity: 1;\n  }\n\n  to {\n    transform: var(--y) translateX(calc(var(--swipe-amount-x) - 100%));\n    opacity: 0;\n  }\n}\n\n@keyframes swipe-out-right {\n  from {\n    transform: var(--y) translateX(var(--swipe-amount-x));\n    opacity: 1;\n  }\n\n  to {\n    transform: var(--y) translateX(calc(var(--swipe-amount-x) + 100%));\n    opacity: 0;\n  }\n}\n\n@keyframes swipe-out-up {\n  from {\n    transform: var(--y) translateY(var(--swipe-amount-y));\n    opacity: 1;\n  }\n\n  to {\n    transform: var(--y) translateY(calc(var(--swipe-amount-y) - 100%));\n    opacity: 0;\n  }\n}\n\n@keyframes swipe-out-down {\n  from {\n    transform: var(--y) translateY(var(--swipe-amount-y));\n    opacity: 1;\n  }\n\n  to {\n    transform: var(--y) translateY(calc(var(--swipe-amount-y) + 100%));\n    opacity: 0;\n  }\n}\n\n@media (max-width: 600px) {\n  [data-sonner-toaster] {\n    position: fixed;\n    right: var(--mobile-offset-right);\n    left: var(--mobile-offset-left);\n    width: 100%;\n  }\n\n  [data-sonner-toaster][dir='rtl'] {\n    left: calc(var(--mobile-offset-left) * -1);\n  }\n\n  [data-sonner-toaster] [data-sonner-toast] {\n    left: 0;\n    right: 0;\n    width: calc(100% - var(--mobile-offset-left) * 2);\n  }\n\n  [data-sonner-toaster][data-x-position='left'] {\n    left: var(--mobile-offset-left);\n  }\n\n  [data-sonner-toaster][data-y-position='bottom'] {\n    bottom: var(--mobile-offset-bottom);\n  }\n\n  [data-sonner-toaster][data-y-position='top'] {\n    top: var(--mobile-offset-top);\n  }\n\n  [data-sonner-toaster][data-x-position='center'] {\n    left: var(--mobile-offset-left);\n    right: var(--mobile-offset-right);\n    transform: none;\n  }\n}\n\n[data-sonner-toaster][data-sonner-theme='light'] {\n  --normal-bg: #fff;\n  --normal-border: var(--gray4);\n  --normal-text: var(--gray12);\n\n  --success-bg: hsl(143, 85%, 96%);\n  --success-border: hsl(145, 92%, 87%);\n  --success-text: hsl(140, 100%, 27%);\n\n  --info-bg: hsl(208, 100%, 97%);\n  --info-border: hsl(221, 91%, 93%);\n  --info-text: hsl(210, 92%, 45%);\n\n  --warning-bg: hsl(49, 100%, 97%);\n  --warning-border: hsl(49, 91%, 84%);\n  --warning-text: hsl(31, 92%, 45%);\n\n  --error-bg: hsl(359, 100%, 97%);\n  --error-border: hsl(359, 100%, 94%);\n  --error-text: hsl(360, 100%, 45%);\n}\n\n[data-sonner-toaster][data-sonner-theme='light'] [data-sonner-toast][data-invert='true'] {\n  --normal-bg: #000;\n  --normal-border: hsl(0, 0%, 20%);\n  --normal-text: var(--gray1);\n}\n\n[data-sonner-toaster][data-sonner-theme='dark'] [data-sonner-toast][data-invert='true'] {\n  --normal-bg: #fff;\n  --normal-border: var(--gray3);\n  --normal-text: var(--gray12);\n}\n\n[data-sonner-toaster][data-sonner-theme='dark'] {\n  --normal-bg: #000;\n  --normal-bg-hover: hsl(0, 0%, 12%);\n  --normal-border: hsl(0, 0%, 20%);\n  --normal-border-hover: hsl(0, 0%, 25%);\n  --normal-text: var(--gray1);\n\n  --success-bg: hsl(150, 100%, 6%);\n  --success-border: hsl(147, 100%, 12%);\n  --success-text: hsl(150, 86%, 65%);\n\n  --info-bg: hsl(215, 100%, 6%);\n  --info-border: hsl(223, 43%, 17%);\n  --info-text: hsl(216, 87%, 65%);\n\n  --warning-bg: hsl(64, 100%, 6%);\n  --warning-border: hsl(60, 100%, 9%);\n  --warning-text: hsl(46, 87%, 65%);\n\n  --error-bg: hsl(358, 76%, 10%);\n  --error-border: hsl(357, 89%, 16%);\n  --error-text: hsl(358, 100%, 81%);\n}\n\n[data-sonner-toaster][data-sonner-theme='dark'] [data-sonner-toast] [data-close-button] {\n  background: var(--normal-bg);\n  border-color: var(--normal-border);\n  color: var(--normal-text);\n}\n\n[data-sonner-toaster][data-sonner-theme='dark'] [data-sonner-toast] [data-close-button]:hover {\n  background: var(--normal-bg-hover);\n  border-color: var(--normal-border-hover);\n}\n\n[data-rich-colors='true'][data-sonner-toast][data-type='success'] {\n  background: var(--success-bg);\n  border-color: var(--success-border);\n  color: var(--success-text);\n}\n\n[data-rich-colors='true'][data-sonner-toast][data-type='success'] [data-close-button] {\n  background: var(--success-bg);\n  border-color: var(--success-border);\n  color: var(--success-text);\n}\n\n[data-rich-colors='true'][data-sonner-toast][data-type='info'] {\n  background: var(--info-bg);\n  border-color: var(--info-border);\n  color: var(--info-text);\n}\n\n[data-rich-colors='true'][data-sonner-toast][data-type='info'] [data-close-button] {\n  background: var(--info-bg);\n  border-color: var(--info-border);\n  color: var(--info-text);\n}\n\n[data-rich-colors='true'][data-sonner-toast][data-type='warning'] {\n  background: var(--warning-bg);\n  border-color: var(--warning-border);\n  color: var(--warning-text);\n}\n\n[data-rich-colors='true'][data-sonner-toast][data-type='warning'] [data-close-button] {\n  background: var(--warning-bg);\n  border-color: var(--warning-border);\n  color: var(--warning-text);\n}\n\n[data-rich-colors='true'][data-sonner-toast][data-type='error'] {\n  background: var(--error-bg);\n  border-color: var(--error-border);\n  color: var(--error-text);\n}\n\n[data-rich-colors='true'][data-sonner-toast][data-type='error'] [data-close-button] {\n  background: var(--error-bg);\n  border-color: var(--error-border);\n  color: var(--error-text);\n}\n\n.sonner-loading-wrapper {\n  --size: 16px;\n  height: var(--size);\n  width: var(--size);\n  position: absolute;\n  inset: 0;\n  z-index: 10;\n}\n\n.sonner-loading-wrapper[data-visible='false'] {\n  transform-origin: center;\n  animation: sonner-fade-out 0.2s ease forwards;\n}\n\n.sonner-spinner {\n  position: relative;\n  top: 50%;\n  left: 50%;\n  height: var(--size);\n  width: var(--size);\n}\n\n.sonner-loading-bar {\n  animation: sonner-spin 1.2s linear infinite;\n  background: var(--gray11);\n  border-radius: 6px;\n  height: 8%;\n  left: -10%;\n  position: absolute;\n  top: -3.9%;\n  width: 24%;\n}\n\n.sonner-loading-bar:nth-child(1) {\n  animation-delay: -1.2s;\n  transform: rotate(0.0001deg) translate(146%);\n}\n\n.sonner-loading-bar:nth-child(2) {\n  animation-delay: -1.1s;\n  transform: rotate(30deg) translate(146%);\n}\n\n.sonner-loading-bar:nth-child(3) {\n  animation-delay: -1s;\n  transform: rotate(60deg) translate(146%);\n}\n\n.sonner-loading-bar:nth-child(4) {\n  animation-delay: -0.9s;\n  transform: rotate(90deg) translate(146%);\n}\n\n.sonner-loading-bar:nth-child(5) {\n  animation-delay: -0.8s;\n  transform: rotate(120deg) translate(146%);\n}\n\n.sonner-loading-bar:nth-child(6) {\n  animation-delay: -0.7s;\n  transform: rotate(150deg) translate(146%);\n}\n\n.sonner-loading-bar:nth-child(7) {\n  animation-delay: -0.6s;\n  transform: rotate(180deg) translate(146%);\n}\n\n.sonner-loading-bar:nth-child(8) {\n  animation-delay: -0.5s;\n  transform: rotate(210deg) translate(146%);\n}\n\n.sonner-loading-bar:nth-child(9) {\n  animation-delay: -0.4s;\n  transform: rotate(240deg) translate(146%);\n}\n\n.sonner-loading-bar:nth-child(10) {\n  animation-delay: -0.3s;\n  transform: rotate(270deg) translate(146%);\n}\n\n.sonner-loading-bar:nth-child(11) {\n  animation-delay: -0.2s;\n  transform: rotate(300deg) translate(146%);\n}\n\n.sonner-loading-bar:nth-child(12) {\n  animation-delay: -0.1s;\n  transform: rotate(330deg) translate(146%);\n}\n\n@keyframes sonner-fade-in {\n  0% {\n    opacity: 0;\n    transform: scale(0.8);\n  }\n  100% {\n    opacity: 1;\n    transform: scale(1);\n  }\n}\n\n@keyframes sonner-fade-out {\n  0% {\n    opacity: 1;\n    transform: scale(1);\n  }\n  100% {\n    opacity: 0;\n    transform: scale(0.8);\n  }\n}\n\n@keyframes sonner-spin {\n  0% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 0.15;\n  }\n}\n\n@media (prefers-reduced-motion) {\n  [data-sonner-toast],\n  [data-sonner-toast] > *,\n  .sonner-loading-bar {\n    transition: none !important;\n    animation: none !important;\n  }\n}\n\n.sonner-loader {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  transform-origin: center;\n  transition: opacity 200ms, transform 200ms;\n}\n\n.sonner-loader[data-visible='false'] {\n  opacity: 0;\n  transform: scale(0.8) translate(-50%, -50%);\n}\n";

function isAction(action) {
    return action.label !== undefined;
}

// Visible toasts amount
const VISIBLE_TOASTS_AMOUNT = 3;
// Viewport padding
const VIEWPORT_OFFSET = '24px';
// Mobile viewport padding
const MOBILE_VIEWPORT_OFFSET = '16px';
// Default lifetime of a toasts (in ms)
const TOAST_LIFETIME = 4000;
// Default toast width
const TOAST_WIDTH = 356;
// Default gap between toasts
const GAP = 14;
// Threshold to dismiss a toast
const SWIPE_THRESHOLD = 45;
// Equal to exit animation duration
const TIME_BEFORE_UNMOUNT = 200;
function cn(...classes) {
    return classes.filter(Boolean).join(' ');
}
function getDefaultSwipeDirections(position) {
    const [y, x] = position.split('-');
    const directions = [];
    if (y) {
        directions.push(y);
    }
    if (x) {
        directions.push(x);
    }
    return directions;
}
const Toast = (props)=>{
    var _toast_classNames, _toast_classNames1, _toast_classNames2, _toast_classNames3, _toast_classNames4, _toast_classNames5, _toast_classNames6, _toast_classNames7, _toast_classNames8;
    const { invert: ToasterInvert, toast, unstyled, interacting, setHeights, visibleToasts, heights, index, toasts, expanded, removeToast, defaultRichColors, closeButton: closeButtonFromToaster, style, cancelButtonStyle, actionButtonStyle, className = '', descriptionClassName = '', duration: durationFromToaster, position, gap, expandByDefault, classNames, icons, closeButtonAriaLabel = 'Close toast' } = props;
    const [swipeDirection, setSwipeDirection] = React.useState(null);
    const [swipeOutDirection, setSwipeOutDirection] = React.useState(null);
    const [mounted, setMounted] = React.useState(false);
    const [removed, setRemoved] = React.useState(false);
    const [swiping, setSwiping] = React.useState(false);
    const [swipeOut, setSwipeOut] = React.useState(false);
    const [isSwiped, setIsSwiped] = React.useState(false);
    const [offsetBeforeRemove, setOffsetBeforeRemove] = React.useState(0);
    const [initialHeight, setInitialHeight] = React.useState(0);
    const remainingTime = React.useRef(toast.duration || durationFromToaster || TOAST_LIFETIME);
    const dragStartTime = React.useRef(null);
    const toastRef = React.useRef(null);
    const isFront = index === 0;
    const isVisible = index + 1 <= visibleToasts;
    const toastType = toast.type;
    const dismissible = toast.dismissible !== false;
    const toastClassname = toast.className || '';
    const toastDescriptionClassname = toast.descriptionClassName || '';
    // Height index is used to calculate the offset as it gets updated before the toast array, which means we can calculate the new layout faster.
    const heightIndex = React.useMemo(()=>heights.findIndex((height)=>height.toastId === toast.id) || 0, [
        heights,
        toast.id
    ]);
    const closeButton = React.useMemo(()=>{
        var _toast_closeButton;
        return (_toast_closeButton = toast.closeButton) != null ? _toast_closeButton : closeButtonFromToaster;
    }, [
        toast.closeButton,
        closeButtonFromToaster
    ]);
    const duration = React.useMemo(()=>toast.duration || durationFromToaster || TOAST_LIFETIME, [
        toast.duration,
        durationFromToaster
    ]);
    const closeTimerStartTimeRef = React.useRef(0);
    const offset = React.useRef(0);
    const lastCloseTimerStartTimeRef = React.useRef(0);
    const pointerStartRef = React.useRef(null);
    const [y, x] = position.split('-');
    const toastsHeightBefore = React.useMemo(()=>{
        return heights.reduce((prev, curr, reducerIndex)=>{
            // Calculate offset up until current toast
            if (reducerIndex >= heightIndex) {
                return prev;
            }
            return prev + curr.height;
        }, 0);
    }, [
        heights,
        heightIndex
    ]);
    const isDocumentHidden = useIsDocumentHidden();
    const invert = toast.invert || ToasterInvert;
    const disabled = toastType === 'loading';
    offset.current = React.useMemo(()=>heightIndex * gap + toastsHeightBefore, [
        heightIndex,
        toastsHeightBefore
    ]);
    React.useEffect(()=>{
        remainingTime.current = duration;
    }, [
        duration
    ]);
    React.useEffect(()=>{
        // Trigger enter animation without using CSS animation
        setMounted(true);
    }, []);
    React.useEffect(()=>{
        const toastNode = toastRef.current;
        if (toastNode) {
            const height = toastNode.getBoundingClientRect().height;
            // Add toast height to heights array after the toast is mounted
            setInitialHeight(height);
            setHeights((h)=>[
                    {
                        toastId: toast.id,
                        height,
                        position: toast.position
                    },
                    ...h
                ]);
            return ()=>setHeights((h)=>h.filter((height)=>height.toastId !== toast.id));
        }
    }, [
        setHeights,
        toast.id
    ]);
    React.useLayoutEffect(()=>{
        // Keep height up to date with the content in case it updates
        if (!mounted) return;
        const toastNode = toastRef.current;
        const originalHeight = toastNode.style.height;
        toastNode.style.height = 'auto';
        const newHeight = toastNode.getBoundingClientRect().height;
        toastNode.style.height = originalHeight;
        setInitialHeight(newHeight);
        setHeights((heights)=>{
            const alreadyExists = heights.find((height)=>height.toastId === toast.id);
            if (!alreadyExists) {
                return [
                    {
                        toastId: toast.id,
                        height: newHeight,
                        position: toast.position
                    },
                    ...heights
                ];
            } else {
                return heights.map((height)=>height.toastId === toast.id ? {
                        ...height,
                        height: newHeight
                    } : height);
            }
        });
    }, [
        mounted,
        toast.title,
        toast.description,
        setHeights,
        toast.id,
        toast.jsx,
        toast.action,
        toast.cancel
    ]);
    const deleteToast = React.useCallback(()=>{
        // Save the offset for the exit swipe animation
        setRemoved(true);
        setOffsetBeforeRemove(offset.current);
        setHeights((h)=>h.filter((height)=>height.toastId !== toast.id));
        setTimeout(()=>{
            removeToast(toast);
        }, TIME_BEFORE_UNMOUNT);
    }, [
        toast,
        removeToast,
        setHeights,
        offset
    ]);
    React.useEffect(()=>{
        if (toast.promise && toastType === 'loading' || toast.duration === Infinity || toast.type === 'loading') return;
        let timeoutId;
        // Pause the timer on each hover
        const pauseTimer = ()=>{
            if (lastCloseTimerStartTimeRef.current < closeTimerStartTimeRef.current) {
                // Get the elapsed time since the timer started
                const elapsedTime = new Date().getTime() - closeTimerStartTimeRef.current;
                remainingTime.current = remainingTime.current - elapsedTime;
            }
            lastCloseTimerStartTimeRef.current = new Date().getTime();
        };
        const startTimer = ()=>{
            // setTimeout(, Infinity) behaves as if the delay is 0.
            // As a result, the toast would be closed immediately, giving the appearance that it was never rendered.
            // See: https://github.com/denysdovhan/wtfjs?tab=readme-ov-file#an-infinite-timeout
            if (remainingTime.current === Infinity) return;
            closeTimerStartTimeRef.current = new Date().getTime();
            // Let the toast know it has started
            timeoutId = setTimeout(()=>{
                toast.onAutoClose == null ? void 0 : toast.onAutoClose.call(toast, toast);
                deleteToast();
            }, remainingTime.current);
        };
        if (expanded || interacting || isDocumentHidden) {
            pauseTimer();
        } else {
            startTimer();
        }
        return ()=>clearTimeout(timeoutId);
    }, [
        expanded,
        interacting,
        toast,
        toastType,
        isDocumentHidden,
        deleteToast
    ]);
    React.useEffect(()=>{
        if (toast.delete) {
            deleteToast();
            toast.onDismiss == null ? void 0 : toast.onDismiss.call(toast, toast);
        }
    }, [
        deleteToast,
        toast.delete
    ]);
    function getLoadingIcon() {
        var _toast_classNames;
        if (icons == null ? void 0 : icons.loading) {
            var _toast_classNames1;
            return /*#__PURE__*/ React.createElement("div", {
                className: cn(classNames == null ? void 0 : classNames.loader, toast == null ? void 0 : (_toast_classNames1 = toast.classNames) == null ? void 0 : _toast_classNames1.loader, 'sonner-loader'),
                "data-visible": toastType === 'loading'
            }, icons.loading);
        }
        return /*#__PURE__*/ React.createElement(Loader, {
            className: cn(classNames == null ? void 0 : classNames.loader, toast == null ? void 0 : (_toast_classNames = toast.classNames) == null ? void 0 : _toast_classNames.loader),
            visible: toastType === 'loading'
        });
    }
    const icon = toast.icon || (icons == null ? void 0 : icons[toastType]) || getAsset(toastType);
    var _toast_richColors, _icons_close;
    return /*#__PURE__*/ React.createElement("li", {
        tabIndex: 0,
        ref: toastRef,
        className: cn(className, toastClassname, classNames == null ? void 0 : classNames.toast, toast == null ? void 0 : (_toast_classNames = toast.classNames) == null ? void 0 : _toast_classNames.toast, classNames == null ? void 0 : classNames.default, classNames == null ? void 0 : classNames[toastType], toast == null ? void 0 : (_toast_classNames1 = toast.classNames) == null ? void 0 : _toast_classNames1[toastType]),
        "data-sonner-toast": "",
        "data-rich-colors": (_toast_richColors = toast.richColors) != null ? _toast_richColors : defaultRichColors,
        "data-styled": !Boolean(toast.jsx || toast.unstyled || unstyled),
        "data-mounted": mounted,
        "data-promise": Boolean(toast.promise),
        "data-swiped": isSwiped,
        "data-removed": removed,
        "data-visible": isVisible,
        "data-y-position": y,
        "data-x-position": x,
        "data-index": index,
        "data-front": isFront,
        "data-swiping": swiping,
        "data-dismissible": dismissible,
        "data-type": toastType,
        "data-invert": invert,
        "data-swipe-out": swipeOut,
        "data-swipe-direction": swipeOutDirection,
        "data-expanded": Boolean(expanded || expandByDefault && mounted),
        style: {
            '--index': index,
            '--toasts-before': index,
            '--z-index': toasts.length - index,
            '--offset': `${removed ? offsetBeforeRemove : offset.current}px`,
            '--initial-height': expandByDefault ? 'auto' : `${initialHeight}px`,
            ...style,
            ...toast.style
        },
        onDragEnd: ()=>{
            setSwiping(false);
            setSwipeDirection(null);
            pointerStartRef.current = null;
        },
        onPointerDown: (event)=>{
            if (event.button === 2) return; // Return early on right click
            if (disabled || !dismissible) return;
            dragStartTime.current = new Date();
            setOffsetBeforeRemove(offset.current);
            // Ensure we maintain correct pointer capture even when going outside of the toast (e.g. when swiping)
            event.target.setPointerCapture(event.pointerId);
            if (event.target.tagName === 'BUTTON') return;
            setSwiping(true);
            pointerStartRef.current = {
                x: event.clientX,
                y: event.clientY
            };
        },
        onPointerUp: ()=>{
            var _toastRef_current, _toastRef_current1, _dragStartTime_current;
            if (swipeOut || !dismissible) return;
            pointerStartRef.current = null;
            const swipeAmountX = Number(((_toastRef_current = toastRef.current) == null ? void 0 : _toastRef_current.style.getPropertyValue('--swipe-amount-x').replace('px', '')) || 0);
            const swipeAmountY = Number(((_toastRef_current1 = toastRef.current) == null ? void 0 : _toastRef_current1.style.getPropertyValue('--swipe-amount-y').replace('px', '')) || 0);
            const timeTaken = new Date().getTime() - ((_dragStartTime_current = dragStartTime.current) == null ? void 0 : _dragStartTime_current.getTime());
            const swipeAmount = swipeDirection === 'x' ? swipeAmountX : swipeAmountY;
            const velocity = Math.abs(swipeAmount) / timeTaken;
            if (Math.abs(swipeAmount) >= SWIPE_THRESHOLD || velocity > 0.11) {
                setOffsetBeforeRemove(offset.current);
                toast.onDismiss == null ? void 0 : toast.onDismiss.call(toast, toast);
                if (swipeDirection === 'x') {
                    setSwipeOutDirection(swipeAmountX > 0 ? 'right' : 'left');
                } else {
                    setSwipeOutDirection(swipeAmountY > 0 ? 'down' : 'up');
                }
                deleteToast();
                setSwipeOut(true);
                return;
            } else {
                var _toastRef_current2, _toastRef_current3;
                (_toastRef_current2 = toastRef.current) == null ? void 0 : _toastRef_current2.style.setProperty('--swipe-amount-x', `0px`);
                (_toastRef_current3 = toastRef.current) == null ? void 0 : _toastRef_current3.style.setProperty('--swipe-amount-y', `0px`);
            }
            setIsSwiped(false);
            setSwiping(false);
            setSwipeDirection(null);
        },
        onPointerMove: (event)=>{
            var _window_getSelection, // Apply transform using both x and y values
            _toastRef_current, _toastRef_current1;
            if (!pointerStartRef.current || !dismissible) return;
            const isHighlighted = ((_window_getSelection = window.getSelection()) == null ? void 0 : _window_getSelection.toString().length) > 0;
            if (isHighlighted) return;
            const yDelta = event.clientY - pointerStartRef.current.y;
            const xDelta = event.clientX - pointerStartRef.current.x;
            var _props_swipeDirections;
            const swipeDirections = (_props_swipeDirections = props.swipeDirections) != null ? _props_swipeDirections : getDefaultSwipeDirections(position);
            // Determine swipe direction if not already locked
            if (!swipeDirection && (Math.abs(xDelta) > 1 || Math.abs(yDelta) > 1)) {
                setSwipeDirection(Math.abs(xDelta) > Math.abs(yDelta) ? 'x' : 'y');
            }
            let swipeAmount = {
                x: 0,
                y: 0
            };
            const getDampening = (delta)=>{
                const factor = Math.abs(delta) / 20;
                return 1 / (1.5 + factor);
            };
            // Only apply swipe in the locked direction
            if (swipeDirection === 'y') {
                // Handle vertical swipes
                if (swipeDirections.includes('top') || swipeDirections.includes('bottom')) {
                    if (swipeDirections.includes('top') && yDelta < 0 || swipeDirections.includes('bottom') && yDelta > 0) {
                        swipeAmount.y = yDelta;
                    } else {
                        // Smoothly transition to dampened movement
                        const dampenedDelta = yDelta * getDampening(yDelta);
                        // Ensure we don't jump when transitioning to dampened movement
                        swipeAmount.y = Math.abs(dampenedDelta) < Math.abs(yDelta) ? dampenedDelta : yDelta;
                    }
                }
            } else if (swipeDirection === 'x') {
                // Handle horizontal swipes
                if (swipeDirections.includes('left') || swipeDirections.includes('right')) {
                    if (swipeDirections.includes('left') && xDelta < 0 || swipeDirections.includes('right') && xDelta > 0) {
                        swipeAmount.x = xDelta;
                    } else {
                        // Smoothly transition to dampened movement
                        const dampenedDelta = xDelta * getDampening(xDelta);
                        // Ensure we don't jump when transitioning to dampened movement
                        swipeAmount.x = Math.abs(dampenedDelta) < Math.abs(xDelta) ? dampenedDelta : xDelta;
                    }
                }
            }
            if (Math.abs(swipeAmount.x) > 0 || Math.abs(swipeAmount.y) > 0) {
                setIsSwiped(true);
            }
            (_toastRef_current = toastRef.current) == null ? void 0 : _toastRef_current.style.setProperty('--swipe-amount-x', `${swipeAmount.x}px`);
            (_toastRef_current1 = toastRef.current) == null ? void 0 : _toastRef_current1.style.setProperty('--swipe-amount-y', `${swipeAmount.y}px`);
        }
    }, closeButton && !toast.jsx && toastType !== 'loading' ? /*#__PURE__*/ React.createElement("button", {
        "aria-label": closeButtonAriaLabel,
        "data-disabled": disabled,
        "data-close-button": true,
        onClick: disabled || !dismissible ? ()=>{} : ()=>{
            deleteToast();
            toast.onDismiss == null ? void 0 : toast.onDismiss.call(toast, toast);
        },
        className: cn(classNames == null ? void 0 : classNames.closeButton, toast == null ? void 0 : (_toast_classNames2 = toast.classNames) == null ? void 0 : _toast_classNames2.closeButton)
    }, (_icons_close = icons == null ? void 0 : icons.close) != null ? _icons_close : CloseIcon) : null, (toastType || toast.icon || toast.promise) && toast.icon !== null && ((icons == null ? void 0 : icons[toastType]) !== null || toast.icon) ? /*#__PURE__*/ React.createElement("div", {
        "data-icon": "",
        className: cn(classNames == null ? void 0 : classNames.icon, toast == null ? void 0 : (_toast_classNames3 = toast.classNames) == null ? void 0 : _toast_classNames3.icon)
    }, toast.promise || toast.type === 'loading' && !toast.icon ? toast.icon || getLoadingIcon() : null, toast.type !== 'loading' ? icon : null) : null, /*#__PURE__*/ React.createElement("div", {
        "data-content": "",
        className: cn(classNames == null ? void 0 : classNames.content, toast == null ? void 0 : (_toast_classNames4 = toast.classNames) == null ? void 0 : _toast_classNames4.content)
    }, /*#__PURE__*/ React.createElement("div", {
        "data-title": "",
        className: cn(classNames == null ? void 0 : classNames.title, toast == null ? void 0 : (_toast_classNames5 = toast.classNames) == null ? void 0 : _toast_classNames5.title)
    }, toast.jsx ? toast.jsx : typeof toast.title === 'function' ? toast.title() : toast.title), toast.description ? /*#__PURE__*/ React.createElement("div", {
        "data-description": "",
        className: cn(descriptionClassName, toastDescriptionClassname, classNames == null ? void 0 : classNames.description, toast == null ? void 0 : (_toast_classNames6 = toast.classNames) == null ? void 0 : _toast_classNames6.description)
    }, typeof toast.description === 'function' ? toast.description() : toast.description) : null), /*#__PURE__*/ React.isValidElement(toast.cancel) ? toast.cancel : toast.cancel && isAction(toast.cancel) ? /*#__PURE__*/ React.createElement("button", {
        "data-button": true,
        "data-cancel": true,
        style: toast.cancelButtonStyle || cancelButtonStyle,
        onClick: (event)=>{
            // We need to check twice because typescript
            if (!isAction(toast.cancel)) return;
            if (!dismissible) return;
            toast.cancel.onClick == null ? void 0 : toast.cancel.onClick.call(toast.cancel, event);
            deleteToast();
        },
        className: cn(classNames == null ? void 0 : classNames.cancelButton, toast == null ? void 0 : (_toast_classNames7 = toast.classNames) == null ? void 0 : _toast_classNames7.cancelButton)
    }, toast.cancel.label) : null, /*#__PURE__*/ React.isValidElement(toast.action) ? toast.action : toast.action && isAction(toast.action) ? /*#__PURE__*/ React.createElement("button", {
        "data-button": true,
        "data-action": true,
        style: toast.actionButtonStyle || actionButtonStyle,
        onClick: (event)=>{
            // We need to check twice because typescript
            if (!isAction(toast.action)) return;
            toast.action.onClick == null ? void 0 : toast.action.onClick.call(toast.action, event);
            if (event.defaultPrevented) return;
            deleteToast();
        },
        className: cn(classNames == null ? void 0 : classNames.actionButton, toast == null ? void 0 : (_toast_classNames8 = toast.classNames) == null ? void 0 : _toast_classNames8.actionButton)
    }, toast.action.label) : null);
};
function getDocumentDirection() {
    if (typeof window === 'undefined') return 'ltr';
    if (typeof document === 'undefined') return 'ltr'; // For Fresh purpose
    const dirAttribute = document.documentElement.getAttribute('dir');
    if (dirAttribute === 'auto' || !dirAttribute) {
        return window.getComputedStyle(document.documentElement).direction;
    }
    return dirAttribute;
}
function assignOffset(defaultOffset, mobileOffset) {
    const styles = {};
    [
        defaultOffset,
        mobileOffset
    ].forEach((offset, index)=>{
        const isMobile = index === 1;
        const prefix = isMobile ? '--mobile-offset' : '--offset';
        const defaultValue = isMobile ? MOBILE_VIEWPORT_OFFSET : VIEWPORT_OFFSET;
        function assignAll(offset) {
            [
                'top',
                'right',
                'bottom',
                'left'
            ].forEach((key)=>{
                styles[`${prefix}-${key}`] = typeof offset === 'number' ? `${offset}px` : offset;
            });
        }
        if (typeof offset === 'number' || typeof offset === 'string') {
            assignAll(offset);
        } else if (typeof offset === 'object') {
            [
                'top',
                'right',
                'bottom',
                'left'
            ].forEach((key)=>{
                if (offset[key] === undefined) {
                    styles[`${prefix}-${key}`] = defaultValue;
                } else {
                    styles[`${prefix}-${key}`] = typeof offset[key] === 'number' ? `${offset[key]}px` : offset[key];
                }
            });
        } else {
            assignAll(defaultValue);
        }
    });
    return styles;
}
function useSonner() {
    const [activeToasts, setActiveToasts] = React.useState([]);
    React.useEffect(()=>{
        return ToastState.subscribe((toast)=>{
            if (toast.dismiss) {
                setTimeout(()=>{
                    ReactDOM.flushSync(()=>{
                        setActiveToasts((toasts)=>toasts.filter((t)=>t.id !== toast.id));
                    });
                });
                return;
            }
            // Prevent batching, temp solution.
            setTimeout(()=>{
                ReactDOM.flushSync(()=>{
                    setActiveToasts((toasts)=>{
                        const indexOfExistingToast = toasts.findIndex((t)=>t.id === toast.id);
                        // Update the toast if it already exists
                        if (indexOfExistingToast !== -1) {
                            return [
                                ...toasts.slice(0, indexOfExistingToast),
                                {
                                    ...toasts[indexOfExistingToast],
                                    ...toast
                                },
                                ...toasts.slice(indexOfExistingToast + 1)
                            ];
                        }
                        return [
                            toast,
                            ...toasts
                        ];
                    });
                });
            });
        });
    }, []);
    return {
        toasts: activeToasts
    };
}
function insertCSS(target, code) {
    const style = document.createElement('style');
    style.type = 'text/css';
    target.appendChild(style);
    style.appendChild(document.createTextNode(code));
}
const Toaster = /*#__PURE__*/ React.forwardRef(function Toaster(props, ref) {
    const { invert, position = 'bottom-right', hotkey = [
        'altKey',
        'KeyT'
    ], expand, closeButton, className, offset, mobileOffset, theme = 'light', richColors, duration, style, visibleToasts = VISIBLE_TOASTS_AMOUNT, toastOptions, dir = getDocumentDirection(), gap = GAP, icons, containerAriaLabel = 'Notifications', cssContainer } = props;
    const [toasts, setToasts] = React.useState([]);
    const possiblePositions = React.useMemo(()=>{
        return Array.from(new Set([
            position
        ].concat(toasts.filter((toast)=>toast.position).map((toast)=>toast.position))));
    }, [
        toasts,
        position
    ]);
    const [heights, setHeights] = React.useState([]);
    const [expanded, setExpanded] = React.useState(false);
    const [interacting, setInteracting] = React.useState(false);
    const [actualTheme, setActualTheme] = React.useState(theme !== 'system' ? theme : typeof window !== 'undefined' ? window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light' : 'light');
    const listRef = React.useRef(null);
    const hotkeyLabel = hotkey.join('+').replace(/Key/g, '').replace(/Digit/g, '');
    const lastFocusedElementRef = React.useRef(null);
    const isFocusWithinRef = React.useRef(false);
    const removeToast = React.useCallback((toastToRemove)=>{
        setToasts((toasts)=>{
            var _toasts_find;
            if (!((_toasts_find = toasts.find((toast)=>toast.id === toastToRemove.id)) == null ? void 0 : _toasts_find.delete)) {
                ToastState.dismiss(toastToRemove.id);
            }
            return toasts.filter(({ id })=>id !== toastToRemove.id);
        });
    }, []);
    React.useEffect(()=>{
        if (typeof document !== 'undefined') {
            insertCSS(cssContainer != null ? cssContainer : document.body, data);
        }
    }, [
        cssContainer
    ]);
    React.useEffect(()=>{
        return ToastState.subscribe((toast)=>{
            if (toast.dismiss) {
                // Prevent batching of other state updates
                requestAnimationFrame(()=>{
                    setToasts((toasts)=>toasts.map((t)=>t.id === toast.id ? {
                                ...t,
                                delete: true
                            } : t));
                });
                return;
            }
            // Prevent batching, temp solution.
            setTimeout(()=>{
                ReactDOM.flushSync(()=>{
                    setToasts((toasts)=>{
                        const indexOfExistingToast = toasts.findIndex((t)=>t.id === toast.id);
                        // Update the toast if it already exists
                        if (indexOfExistingToast !== -1) {
                            return [
                                ...toasts.slice(0, indexOfExistingToast),
                                {
                                    ...toasts[indexOfExistingToast],
                                    ...toast
                                },
                                ...toasts.slice(indexOfExistingToast + 1)
                            ];
                        }
                        return [
                            toast,
                            ...toasts
                        ];
                    });
                });
            });
        });
    }, [
        toasts
    ]);
    React.useEffect(()=>{
        if (theme !== 'system') {
            setActualTheme(theme);
            return;
        }
        if (theme === 'system') {
            // check if current preference is dark
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                // it's currently dark
                setActualTheme('dark');
            } else {
                // it's not dark
                setActualTheme('light');
            }
        }
        if (typeof window === 'undefined') return;
        const darkMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        try {
            // Chrome & Firefox
            darkMediaQuery.addEventListener('change', ({ matches })=>{
                if (matches) {
                    setActualTheme('dark');
                } else {
                    setActualTheme('light');
                }
            });
        } catch (error) {
            // Safari < 14
            darkMediaQuery.addListener(({ matches })=>{
                try {
                    if (matches) {
                        setActualTheme('dark');
                    } else {
                        setActualTheme('light');
                    }
                } catch (e) {
                    console.error(e);
                }
            });
        }
    }, [
        theme
    ]);
    React.useEffect(()=>{
        // Ensure expanded is always false when no toasts are present / only one left
        if (toasts.length <= 1) {
            setExpanded(false);
        }
    }, [
        toasts
    ]);
    React.useEffect(()=>{
        const handleKeyDown = (event)=>{
            var _listRef_current;
            const isHotkeyPressed = hotkey.every((key)=>event[key] || event.code === key);
            if (isHotkeyPressed) {
                var _listRef_current1;
                setExpanded(true);
                (_listRef_current1 = listRef.current) == null ? void 0 : _listRef_current1.focus();
            }
            if (event.code === 'Escape' && (document.activeElement === listRef.current || ((_listRef_current = listRef.current) == null ? void 0 : _listRef_current.contains(document.activeElement)))) {
                setExpanded(false);
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return ()=>document.removeEventListener('keydown', handleKeyDown);
    }, [
        hotkey
    ]);
    React.useEffect(()=>{
        if (listRef.current) {
            return ()=>{
                if (lastFocusedElementRef.current) {
                    lastFocusedElementRef.current.focus({
                        preventScroll: true
                    });
                    lastFocusedElementRef.current = null;
                    isFocusWithinRef.current = false;
                }
            };
        }
    }, [
        listRef.current
    ]);
    return(// Remove item from normal navigation flow, only available via hotkey
    /*#__PURE__*/ React.createElement("section", {
        ref: ref,
        "aria-label": `${containerAriaLabel} ${hotkeyLabel}`,
        tabIndex: -1,
        "aria-live": "polite",
        "aria-relevant": "additions text",
        "aria-atomic": "false",
        suppressHydrationWarning: true
    }, possiblePositions.map((position, index)=>{
        var _heights_;
        const [y, x] = position.split('-');
        if (!toasts.length) return null;
        return /*#__PURE__*/ React.createElement("ol", {
            key: position,
            dir: dir === 'auto' ? getDocumentDirection() : dir,
            tabIndex: -1,
            ref: listRef,
            className: className,
            "data-sonner-toaster": true,
            "data-sonner-theme": actualTheme,
            "data-y-position": y,
            "data-x-position": x,
            style: {
                '--front-toast-height': `${((_heights_ = heights[0]) == null ? void 0 : _heights_.height) || 0}px`,
                '--width': `${TOAST_WIDTH}px`,
                '--gap': `${gap}px`,
                ...style,
                ...assignOffset(offset, mobileOffset)
            },
            onBlur: (event)=>{
                if (isFocusWithinRef.current && !event.currentTarget.contains(event.relatedTarget)) {
                    isFocusWithinRef.current = false;
                    if (lastFocusedElementRef.current) {
                        lastFocusedElementRef.current.focus({
                            preventScroll: true
                        });
                        lastFocusedElementRef.current = null;
                    }
                }
            },
            onFocus: (event)=>{
                const isNotDismissible = event.target instanceof HTMLElement && event.target.dataset.dismissible === 'false';
                if (isNotDismissible) return;
                if (!isFocusWithinRef.current) {
                    isFocusWithinRef.current = true;
                    lastFocusedElementRef.current = event.relatedTarget;
                }
            },
            onMouseEnter: ()=>setExpanded(true),
            onMouseMove: ()=>setExpanded(true),
            onMouseLeave: ()=>{
                // Avoid setting expanded to false when interacting with a toast, e.g. swiping
                if (!interacting) {
                    setExpanded(false);
                }
            },
            onDragEnd: ()=>setExpanded(false),
            onPointerDown: (event)=>{
                const isNotDismissible = event.target instanceof HTMLElement && event.target.dataset.dismissible === 'false';
                if (isNotDismissible) return;
                setInteracting(true);
            },
            onPointerUp: ()=>setInteracting(false)
        }, toasts.filter((toast)=>!toast.position && index === 0 || toast.position === position).map((toast, index)=>{
            var _toastOptions_duration, _toastOptions_closeButton;
            return /*#__PURE__*/ React.createElement(Toast, {
                key: toast.id,
                icons: icons,
                index: index,
                toast: toast,
                defaultRichColors: richColors,
                duration: (_toastOptions_duration = toastOptions == null ? void 0 : toastOptions.duration) != null ? _toastOptions_duration : duration,
                className: toastOptions == null ? void 0 : toastOptions.className,
                descriptionClassName: toastOptions == null ? void 0 : toastOptions.descriptionClassName,
                invert: invert,
                visibleToasts: visibleToasts,
                closeButton: (_toastOptions_closeButton = toastOptions == null ? void 0 : toastOptions.closeButton) != null ? _toastOptions_closeButton : closeButton,
                interacting: interacting,
                position: position,
                style: toastOptions == null ? void 0 : toastOptions.style,
                unstyled: toastOptions == null ? void 0 : toastOptions.unstyled,
                classNames: toastOptions == null ? void 0 : toastOptions.classNames,
                cancelButtonStyle: toastOptions == null ? void 0 : toastOptions.cancelButtonStyle,
                actionButtonStyle: toastOptions == null ? void 0 : toastOptions.actionButtonStyle,
                closeButtonAriaLabel: toastOptions == null ? void 0 : toastOptions.closeButtonAriaLabel,
                removeToast: removeToast,
                toasts: toasts.filter((t)=>t.position == toast.position),
                heights: heights.filter((h)=>h.position == toast.position),
                setHeights: setHeights,
                expandByDefault: expand,
                gap: gap,
                expanded: expanded,
                swipeDirections: props.swipeDirections
            });
        }));
    })));
});

export { Toaster, toast, useSonner };
