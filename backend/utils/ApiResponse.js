const asyncHandler = (requestHandler)=>{
    requestHandler,res,next
    Promise.resolve(requestHandler(requestHandler,res,next)).catch((err)=> next)
}

export {asyncHandler}
