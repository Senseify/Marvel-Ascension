import { useEffect, useRef, useState } from 'react';
import { Socket } from 'socket.io-client';
import { GameState, GameSettings, BotPersonality, AscensionBattleState, BattleActionType } from '../types/game';
import { socket as sharedSocket, authenticateSocket } from '../socket/socket';

export function useSocket() {
  const socketRef = useRef<Socket>(sharedSocket);
  const [isConnected, setIsConnected] = useState<boolean>(sharedSocket.connected);
  const [socketId, setSocketId] = useState<string | undefined>(sharedSocket.id);
  const [onlineState, setOnlineState] = useState<GameState | null>(null);
  const [ascensionState, setAscensionState] = useState<AscensionBattleState | null>(null);
  const [ascensionResult, setAscensionResult] = useState<any>(null);
  const [lastError, setLastError] = useState<string | null>(null);

  useEffect(() => {
    socketRef.current = sharedSocket;
    setIsConnected(sharedSocket.connected);
    setSocketId(sharedSocket.id);

    const onConnect = () => {
      setIsConnected(true);
      setSocketId(sharedSocket.id);
      console.log('[Socket] Connected to server:', sharedSocket.id);
      authenticateSocket();
    };

    const onDisconnect = () => {
      setIsConnected(false);
      console.log('[Socket] Disconnected');
    };

    const onConnectError = (err: any) => {
      console.warn('Socket connection error:', err.message);
      setIsConnected(false);
    };

    const onGameStateUpdate = (state: GameState) => {
      setOnlineState(state);
    };
    const onAscensionStateUpdate = (state: AscensionBattleState) => {
      setAscensionState(state);
    };
    const onAscensionMatchFound = (payload: { state?: AscensionBattleState }) => {
      if (payload?.state) setAscensionState(payload.state);
    };
    const onAscensionMatchResult = (result: any) => {
      setAscensionResult(result);
    };
    const onAscensionKicked = (payload: { message?: string }) => {
      setAscensionState(null);
      setLastError(payload?.message || 'You have been kicked from the room.');
    };

    sharedSocket.on('connect', onConnect);
    sharedSocket.on('disconnect', onDisconnect);
    sharedSocket.on('connect_error', onConnectError);
    sharedSocket.on('game_state_update', onGameStateUpdate);
    sharedSocket.on('ascension_state_update', onAscensionStateUpdate);
    sharedSocket.on('ascension_match_found', onAscensionMatchFound);
    sharedSocket.on('ascension_match_result', onAscensionMatchResult);
    sharedSocket.on('ascension_kicked', onAscensionKicked);

    if (sharedSocket.connected) {
      authenticateSocket();
    }

    return () => {
      sharedSocket.off('connect', onConnect);
      sharedSocket.off('disconnect', onDisconnect);
      sharedSocket.off('connect_error', onConnectError);
      sharedSocket.off('game_state_update', onGameStateUpdate);
      sharedSocket.off('ascension_state_update', onAscensionStateUpdate);
      sharedSocket.off('ascension_match_found', onAscensionMatchFound);
      sharedSocket.off('ascension_match_result', onAscensionMatchResult);
      sharedSocket.off('ascension_kicked', onAscensionKicked);
    };
  }, []);

  const createRoom = (playerName: string, avatar: string): Promise<{ success: boolean; roomId?: string; error?: string }> => {
    return new Promise((resolve) => {
      if (!socketRef.current) return resolve({ success: false, error: 'Socket not initialized' });
      const authToken = localStorage.getItem('mcu_auth_token') || undefined;
      socketRef.current.emit('create_room', { playerName, avatar, authToken }, (res: { success: boolean; roomId?: string; state?: GameState; error?: string }) => {
        if (res.success && res.state) {
          setOnlineState(res.state);
        }
        resolve(res);
      });
    });
  };

  const joinRoom = (roomId: string, playerName: string, avatar: string): Promise<{ success: boolean; error?: string }> => {
    let normalizedCode = (roomId || '').toUpperCase().trim();
    if (/^\d{4}$/.test(normalizedCode)) {
      normalizedCode = `MARVEL-${normalizedCode}`;
    }
    return new Promise((resolve) => {
      if (!socketRef.current) return resolve({ success: false, error: 'Socket not initialized' });
      const authToken = localStorage.getItem('mcu_auth_token') || undefined;
      socketRef.current.emit('join_room', { roomId: normalizedCode, playerName, avatar, authToken }, (res: { success: boolean; state?: GameState; error?: string }) => {
        if (res.success && res.state) {
          setOnlineState(res.state);
        } else if (res.error) {
          setLastError(res.error);
        }
        resolve(res);
      });
    });
  };

  const ascensionRequest = <T extends object>(event: string, payload: object = {}): Promise<T & { success: boolean; error?: string }> => {
    return new Promise(resolve => {
      if (!socketRef.current) return resolve({ success: false, error: 'Socket not initialized' } as T & { success: boolean; error?: string });
      socketRef.current.emit(event, payload, (res: T & { success: boolean; error?: string }) => {
        if (res?.error) setLastError(res.error);
        resolve(res);
      });
    });
  };

  const queueAscension = (mode: 'casual' | 'ranked', format: string, teamIds: string[]): Promise<any> =>
    ascensionRequest('ascension_queue', { mode, format, teamIds, authToken: localStorage.getItem('mcu_auth_token') || undefined }).then(res => {
      if ((res as any).state) setAscensionState((res as any).state);
      return res;
    });

  const cancelAscensionQueue = (): Promise<any> => ascensionRequest('ascension_cancel_queue');

  const createAscensionRoom = (mode: 'casual' | 'ranked', format: string, teamIds: string[], settings?: any): Promise<any> =>
    ascensionRequest('ascension_create_room', { mode, format, teamIds, settings, authToken: localStorage.getItem('mcu_auth_token') || undefined }).then(res => {
      if ((res as any).state) setAscensionState((res as any).state);
      return res;
    });

  const joinAscensionRoom = (roomId: string, teamIds: string[]): Promise<any> =>
    ascensionRequest('ascension_join_room', { roomId, teamIds, authToken: localStorage.getItem('mcu_auth_token') || undefined }).then(res => {
      if ((res as any).state) setAscensionState((res as any).state);
      return res;
    });

  const setAscensionTeam = (teamIds: string[]): Promise<any> => ascensionRequest('ascension_set_team', { teamIds });

  const setAscensionReady = (isReady: boolean): Promise<any> => ascensionRequest('ascension_set_ready', { isReady });

  const updateAscensionSettings = (settings: any): Promise<any> => ascensionRequest('ascension_update_settings', { settings });

  const addAscensionBot = (personality: BotPersonality = 'BALANCED'): Promise<any> => ascensionRequest('ascension_add_bot', { personality });

  const kickAscensionPlayer = (playerId: string): Promise<any> => ascensionRequest('ascension_kick_player', { playerId });

  const sendAscensionChat = (text: string): Promise<any> => ascensionRequest('ascension_send_chat', { text });

  const startAscensionBattle = (): Promise<any> => ascensionRequest('ascension_start_battle');

  const submitAscensionAction = (action: BattleActionType, fighterIndex = 0, skillId?: string): Promise<any> =>
    ascensionRequest('ascension_action', { action, fighterIndex, skillId });

  const leaveAscensionRoom = (): Promise<any> =>
    ascensionRequest('ascension_leave_room').then(res => {
      setAscensionState(null);
      return res;
    });

  const reconnectAscensionRoom = (roomId: string): Promise<any> =>
    ascensionRequest('ascension_reconnect', { roomId, authToken: localStorage.getItem('mcu_auth_token') || undefined });

  const setReady = (isReady: boolean) => {
    socketRef.current?.emit('set_ready', { isReady });
  };

  const addBot = (personality: BotPersonality) => {
    socketRef.current?.emit('add_bot', { personality });
  };

  const updateSettings = (settings: Partial<GameSettings>) => {
    socketRef.current?.emit('update_settings', settings);
  };

  const startGame = (): Promise<{ success: boolean; error?: string }> => {
    return new Promise(resolve => {
      if (!socketRef.current) return resolve({ success: false, error: 'Socket not initialized' });
      socketRef.current?.emit('start_game', (res: { success: boolean; error?: string }) => {
        if (res?.error) setLastError(res.error);
        resolve(res || { success: false, error: 'Socket not initialized' });
      });
    });
  };

  const placeBid = (amount: number): Promise<{ success: boolean; error?: string }> => {
    return new Promise((resolve) => {
      socketRef.current?.emit('place_bid', { amount }, (res: { success: boolean; error?: string }) => {
        if (res.error) setLastError(res.error);
        resolve(res);
      });
    });
  };

  const voteSkip = (): Promise<{ success: boolean; isSkipped?: boolean; error?: string }> => {
    return new Promise((resolve) => {
      socketRef.current?.emit('vote_skip', (res: { success: boolean; isSkipped?: boolean; error?: string }) => {
        resolve(res);
      });
    });
  };

  const instantSkipAuction = (): Promise<{ success: boolean; error?: string }> => {
    return new Promise((resolve) => {
      socketRef.current?.emit('instant_skip', (res: { success: boolean; error?: string }) => {
        resolve(res || { success: true });
      });
    });
  };

  const concedeAuction = (): Promise<{ success: boolean; error?: string }> => {
    return new Promise((resolve) => {
      socketRef.current?.emit('concede_lot', (res: { success: boolean; error?: string }) => {
        resolve(res || { success: true });
      });
    });
  };

  const submitGradeVote = (vote: any): Promise<{ success: boolean; error?: string }> => {
    return new Promise((resolve) => {
      socketRef.current?.emit('vote_grade', { vote }, (res: { success: boolean; error?: string }) => {
        resolve(res || { success: true });
      });
    });
  };

  const concedeMatch = (): Promise<{ success: boolean; error?: string }> => {
    return new Promise((resolve) => {
      socketRef.current?.emit('concede_match', (res: { success: boolean; error?: string }) => {
        resolve(res || { success: true });
      });
    });
  };

  const skipMatch = (): Promise<{ success: boolean; error?: string }> => {
    return new Promise((resolve) => {
      socketRef.current?.emit('skip_match', (res: { success: boolean; error?: string }) => {
        resolve(res || { success: true });
      });
    });
  };

  const playMatch = (matchId: string) => {
    socketRef.current?.emit('play_match', { matchId });
  };

  const executeBattleAction = (action: any, fighterIndex?: number, skillId?: string): Promise<{ success: boolean; error?: string }> => {
    return new Promise((resolve) => {
      socketRef.current?.emit('execute_battle_action', { action, fighterIndex, skillId }, (res: { success: boolean; error?: string }) => {
        resolve(res || { success: true });
      });
    });
  };

  const triggerFlashbang = (targetId: string): Promise<{ success: boolean; error?: string }> => {
    return new Promise((resolve) => {
      socketRef.current?.emit('trigger_flashbang', { targetId }, (res: { success: boolean; error?: string }) => {
        resolve(res || { success: true });
      });
    });
  };

  const useHealingPotion = (heroId?: string): Promise<{ success: boolean; error?: string }> => {
    return new Promise((resolve) => {
      socketRef.current?.emit('use_healing_potion', { heroId }, (res: { success: boolean; error?: string }) => {
        resolve(res || { success: true });
      });
    });
  };

  const updateCollection = (collection: any[], money: number) => {
    socketRef.current?.emit('update_collection', { collection, money });
  };

  const proceedToBattles = () => {
    socketRef.current?.emit('proceed_to_battles');
  };

  const sendSpectatorChat = (message: string) => {
    socketRef.current?.emit('send_spectator_chat', { message });
  };

  const voteRematch = () => {
    socketRef.current?.emit('vote_rematch');
  };

  const updateHostSettings = (settings: Partial<GameSettings>) => {
    socketRef.current?.emit('update_host_settings', { settings });
  };

  const discardCharacter = (playerId: string, characterId: string) => {
    socketRef.current?.emit('discard_character', { playerId, characterId });
  };

  const restartGame = () => {
    socketRef.current?.emit('restart_game');
  };

  const changeTournamentPairing = (firstUserId: string, secondUserId: string): Promise<any> =>
    ascensionRequest('tournament_change_pairing', { firstUserId, secondUserId });

  return {
    socket: socketRef.current,
    socketId: socketId || socketRef.current?.id,
    isConnected,
    onlineState,
    ascensionState,
    ascensionResult,
    setAscensionResult,
    lastError,
    setLastError,
    createRoom,
    joinRoom,
    queueAscension,
    cancelAscensionQueue,
    createAscensionRoom,
    joinAscensionRoom,
    setAscensionTeam,
    setAscensionReady,
    updateAscensionSettings,
    addAscensionBot,
    kickAscensionPlayer,
    sendAscensionChat,
    startAscensionBattle,
    submitAscensionAction,
    leaveAscensionRoom,
    reconnectAscensionRoom,
    setReady,
    addBot,
    updateSettings,
    startGame,
    placeBid,
    voteSkip,
    instantSkipAuction,
    concedeAuction,
    triggerFlashbang,
    useHealingPotion,
    submitGradeVote,
    playMatch,
    concedeMatch,
    skipMatch,
    executeBattleAction,
    updateCollection,
    discardCharacter,
    proceedToBattles,
    restartGame,
    sendSpectatorChat,
    voteRematch,
    updateHostSettings,
    changeTournamentPairing,
  };
}
