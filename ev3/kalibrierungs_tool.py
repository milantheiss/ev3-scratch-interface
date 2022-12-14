#!/usr/bin/env python3

import logging
from ev3dev2.motor import MoveTank

logging.basicConfig(format="%(asctime)s %(name)s %(message)s")
logger = logging.getLogger('Kalibrierungs Tool')
logger.setLevel(logging.INFO)

motors = MoveTank ("outA", "outB")

if __name__ == '__main__': 
    rotations = 5.82
    motors.on_for_rotations(-34.7222222, 34.7222222, rotations)
    ratio = rotations / 360
    logger.info("Rotating %s times. Ratio: %s", rotations, ratio)