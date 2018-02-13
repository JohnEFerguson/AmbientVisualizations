import pandas as pd
import numpy as np
import csv

energy_csv1 = 'kitchen1energy.csv'
power_csv1 = 'kitchen1power.csv'
energy_csv2 = 'kitchen2energy.csv'
power_csv2 = 'kitchen2power.csv'

appliance_data_energy = []
appliance_data_power = []
max_values = []


def readData(file, type):

    df = pd.read_csv(file)

    for column in df:
    
        if column == 'Date & Time':
            continue


        appliance = []
        appliance.append(column[:column.index('[')-1])



        for value in df[column]:
            appliance.append(abs(value))

        if type == 'energy':
            appliance_data_energy.append(appliance)
        else:
            appliance_data_power.append(appliance)



readData(power_csv1, 'power')
readData(energy_csv1, 'energy')
readData(power_csv2, 'power')
readData(energy_csv2, 'energy')

for app in appliance_data_energy:
    #[1000*abs(x) for x in app[1:]]
    appliance = []
    appliance.append(app[0])
    appliance.append(np.amax(app[1:]))
    max_values.append(appliance)




for app in appliance_data_power:



    print np.max(app[1:])


    for match in max_values:
        if app[0] == match[0]:
            match.append(np.max(app[1:]))
            print 'ye'

print max_values



with open('LimitValues.csv', 'wb') as csvfile:
    writer = csv.writer(csvfile, delimiter=',',
                        quotechar=',', quoting=csv.QUOTE_MINIMAL)

    writer.writerow(['Appliance'] + ['Max Energy'] + ['Max Power'])
    
    for app in max_values:
        appliance_name = app[0]
        energy = 1000*app[1]
        power = 1000*app[2]
        
        writer.writerow([appliance_name] + [energy] + [power])
