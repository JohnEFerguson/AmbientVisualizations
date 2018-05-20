#!/usr/bin/env python

import os
import xml.etree.ElementTree as ET
from xml.dom import minidom
import urllib,urllib2
import threading
import csv
import time

urlget=1
threshold=1000
time_id=0
last_id=0
url1 = 'http://137.165.80.32/cgi-bin/egauge?noteam'
url2 = 'http://egauge20975.egaug.es/582B7/cgi-bin/egauge?noteam'
appliance_data = []
CSV_FILE = '../../data/ApplianceData.csv'

tracked_apps = {'1: KitchenReceptacles-microwave': 'microwave', 
                '5: Fridge': 'fridge',
                '11: Oven': 'oven',
                '21: Dishwasher': 'dishwasher',
                '4: RangeHoodPanel': 'rangehood',
                '22: Cooktop': 'stove'}

def getApplianceData(url):
    response=urllib2.urlopen(url)
    tree=ET.parse(response)
    root = tree.getroot()
    for child in root.findall('meter'):
        if str(child.attrib.get('title')) in tracked_apps:
            appliance = {'appliance' : tracked_apps[str(child.attrib.get('title'))], 'energy' : str(child.find('energy').text),
                         'power' : str(abs(float(str(child.find('power').text))))}
            appliance_data.append(appliance)

def writeCSV():
    with open(CSV_FILE, 'wb') as csvfile:
        writer = csv.writer(csvfile, delimiter=',',
                            quotechar=',', quoting=csv.QUOTE_MINIMAL)
        writer.writerow(['Appliance'] + ['Energy'] + ['Power'])
        for x in range(0,len(appliance_data)):
            appliance_name = appliance_data[x]['appliance']
            energy = appliance_data[x]['energy']
            power = appliance_data[x]['power']
            writer.writerow([appliance_name] + [energy] + [power])
            print appliance_name, power
while (True):
    appliance_data = []
    getApplianceData(url1)
    getApplianceData(url2)
    writeCSV()
    time.sleep(10)
