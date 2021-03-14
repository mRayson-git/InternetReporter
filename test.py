import matplotlib.pyplot as plt
import time
import pandas as pd

logFile = open('log.txt', 'rt')

logFeatures = ['Timestamp', 'PingTime']

pastTimeStamp = 0

logs = []
for line in logFile.readlines():
    completedLog = []
    if (len(line) > 1):
        # Split the log on spaces
        line = line.split(' ')
        # Take just the first portion of the timestamp
        timestamp = line[0].split('.')
        timestamp = timestamp[0].replace('[', '')
        # Update the past time stamp
        pastTimeStamp = timestamp
        
        # Take just the number value from the pingTime
        pingTime = line[8].split('=')[1]

        completedLog.append(int(timestamp))
        completedLog.append(float(pingTime))
    else:
        timestamp = int(pastTimeStamp) + 10
        completedLog.append(timestamp)
        completedLog.append(999)

        # Make readable time
        readableTime = time.strftime('%H:%M:%S', time.localtime(timestamp))
        print("Internet dropped at: " + readableTime)

    logs.append(completedLog)

dataframe = pd.DataFrame(data=logs, columns=logFeatures)

dataframe.plot(kind='line', x='Timestamp', y='PingTime', figsize=(10,6))
plt.show()
