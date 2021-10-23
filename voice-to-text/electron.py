
import threading
import asyncio
import websockets
import datetime
import collections
import random
import time
import engine


sendMessageQueue = collections.deque()

def main():
    # start the WebSocket sending on a separate thread so it doesn't block main
    webSockSendThread = threading.Thread(target=sendWebSockStart)
    webSockSendThread.start()

    engine.Engine.startWakeWord()

    while True:
        # make up a random integer and append it to the send queue
        myRandInt = random.randint(1, 10)
        print('appending ' + str(myRandInt))
        sendMessageQueue.append(str(myRandInt))

        # an actual program would have many other activities to do here, use a random sleep to simulate this
        print('doing other stuff')
        time.sleep(random.uniform(1.0, 2.0))



def sendWebSockStart():
    # since we're in a separate thread now, call new_event_loop() (rather than the usual get_event_loop())
    # and set the returned loop as the current loop
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    # instantiate the WebSocket server, note this also connects it to the sendMessages function
    webSocketServer = websockets.serve(sendMessages, 'localhost', 8765)
    # run the webSocketServer forever, which runs the sendMessages function forever
    loop.run_until_complete(webSocketServer)
    loop.run_forever()      # note execution of this separate thread stays on this line forever


async def sendMessages(websocket, path):
    while True:
        await asyncio.sleep(1)
        while len(sendMessageQueue) > 0:
            await websocket.send(sendMessageQueue.popleft())


main()