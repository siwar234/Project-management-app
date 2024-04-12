// JoinTeamPage.js

import React, { useEffect } from 'react';
import {  useLocation,useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { addtoteam } from 'src/JS/actions/equipe';

function JoinTeam() {
    const location = useLocation();
    const navigate = useNavigate();
    
  const params = new URLSearchParams(location.search);
  const token = params.get('token');
  const equipeId = params.get('equipeId');
  const isInvitationUrl = () => {
    const params = new URLSearchParams(location.search);
    return params.has('equipeId') && params.has('token');

  };

  const dispatch = useDispatch();
  
  const x = useSelector((state) => state.userReducer.isAuth);

 

    useEffect(() => {

        dispatch(addtoteam(token,equipeId));

              if(isInvitationUrl && !x){
      
                navigate(`/authentificate/login?equipeId=${equipeId}&token=${token}`);}


                else{

                    
                navigate(`/team/equipe/${equipeId}`)}
            
        
    }, []);

    return (
        <div>
            {/* You can display a loading spinner or a message while the join operation is in progress */}
            <p>Joining team...</p>
            <p>Joining team...</p>

        </div>
    );
}

export default JoinTeam;
