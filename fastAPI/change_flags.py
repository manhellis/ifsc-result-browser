import os
import json
import country_converter as coco
from alive_progress import alive_bar
from concurrent.futures import ThreadPoolExecutor, as_completed

def modify_parameter(file_path_parameter_name):
    file_path, parameter_name = file_path_parameter_name
    try:
        with open(file_path, 'r') as file:
            data = json.load(file)
            new_value = coco.convert(names=data[parameter_name][-7:-4], src="IOC", to='ISO2', not_found=None)
            data[parameter_name] = f'https://flagcdn.com/w40/{new_value.lower()}.webp'
            print(data[parameter_name])

        # Uncomment to write changes back to the file
        with open(file_path, 'w') as file:
            json.dump(data, file, indent=4)
    except Exception as e:
        print(f"Error processing file {file_path}: {e}")
    return 1  # Return 1 for each success to increment the progress bar

def process_files(directory, parameter_name):
    files = [(os.path.join(directory, f), parameter_name) for f in os.listdir(directory) if f.endswith('.json')]
    
    with alive_bar(len(files)) as bar:
        with ThreadPoolExecutor() as executor:
            # Submit all the tasks to the executor
            future_to_file = {executor.submit(modify_parameter, file): file for file in files}
            
            for future in as_completed(future_to_file):
                _ = future.result()  # Retrieve the result to ensure any exceptions are raised
                bar()  # Update the progress bar for each completed future

directory = '../data/athlete'
parameter_name = 'flag_url'

process_files(directory, parameter_name)
print("this doesnt even work...")
