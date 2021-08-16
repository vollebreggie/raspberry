"""
LED light pattern like Google Home
"""

from pixels.apa102 import APA102
import time
import threading
try:
    import queue as Queue
except ImportError:
    import Queue as Queue


class Pixels:
    PIXELS_N = 3

    def __init__(self):
        self.basis = [0] * 3 * self.PIXELS_N
        self.basis[0] = 2
        self.basis[3] = 1
        self.basis[4] = 1
        self.basis[7] = 2

        self.colors = [0] * 3 * self.PIXELS_N
        self.dev = APA102(num_led=self.PIXELS_N)

        self.next = threading.Event()
        self.queue = Queue.Queue()
        self.thread = threading.Thread(target=self._run)
        self.thread.daemon = True
        self.thread.start()

    def wakeup(self, direction=0):
        def f():
            self._wakeup(direction)

        self.next.set()
        self.queue.put(f)

    def listen(self):
        self.next.set()
        self.queue.put(self._listen)

    def think(self):
        self.next.set()
        self.queue.put(self._think)

    def speak(self):
        self.next.set()
        self.queue.put(self._speak)

    def off(self):
        self.next.set()
        self.queue.put(self._off)

    def standby(self):
        self.next.set()
        self.queue.put(self._standby)

    def listening(self):
        self.next.set()
        self.queue.put(self._listening)

    def commando_understood(self):
        self.next.set()
        self.queue.put(self._commando_understood)

    def error(self):
        self.next.set()
        self.queue.put(self._error)

    def _run(self):
        while True:
            func = self.queue.get()
            func()

    def _standby(self):
        colors = self.basis
        colors[0] = 1
        colors[3] = 0
        colors[4] = 0
        colors[7] = 0
        self.write(colors)

    def _listening(self):
        colors = self.basis
        colors[0] = 0
        colors[3] = 1
        colors[4] = 1
        colors[7] = 0
        self._flicker(colors)

    def _commando_understood(self):
        colors = self.basis
        colors[0] = 0
        colors[3] = 0
        colors[4] = 0
        colors[7] = 2
        self._flicker(colors)

    def _error(self):
        colors = self.basis
        colors[0] = 2
        colors[3] = 0
        colors[4] = 0
        colors[7] = 0
        self._flicker(colors)

    def _flicker(self, colors):
        i = 2
        reverse = False
        while True:
            gradientColors = [i * v for v in colors]
            self.write(gradientColors)
            time.sleep(0.1)
            if(i == 0):
                reverse = True
            elif(i == 25):
                reverse = False
            
            if(reverse):
                i += 1
            else:
                i -= 1

            

        
        self.write(colors)

    def _wakeup(self, direction=0):
        for i in range(1, 25):
            colors = [i * v for v in self.basis]
            self.write(colors)
            time.sleep(0.01)

        self.colors = colors

    def _listen(self):
        for i in range(1, 25):
            colors = [i * v for v in self.basis]
            self.write(colors)
            time.sleep(0.01)

        self.colors = colors

    def _think(self):
        colors = self.colors

        self.next.clear()
        while not self.next.is_set():
            colors = colors[3:] + colors[:3]
            self.write(colors)
            time.sleep(0.2)

        t = 0.1
        for i in range(0, 5):
            colors = colors[3:] + colors[:3]
            self.write([(v * (4 - i) / 4) for v in colors])
            time.sleep(t)
            t /= 2

        # time.sleep(0.5)
 
        self.colors = colors

    def _speak(self):
        colors = self.colors
        gradient = -1
        position = 24

        self.next.clear()
        while not self.next.is_set():
            position += gradient
            self.write([(v * position / 24) for v in colors])

            if position == 24 or position == 4:
                gradient = -gradient
                time.sleep(0.2)
            else:
                time.sleep(0.01)

        while position > 0:
            position -= 1
            self.write([(v * position / 24) for v in colors])
            time.sleep(0.01)

        # self._off()

    def _off(self):
        self.write([0] * 3 * self.PIXELS_N)

    def write(self, colors):
        for i in range(self.PIXELS_N):
            self.dev.set_pixel(i, int(colors[3*i]), int(colors[3*i + 1]), int(colors[3*i + 2]))

        self.dev.show()

