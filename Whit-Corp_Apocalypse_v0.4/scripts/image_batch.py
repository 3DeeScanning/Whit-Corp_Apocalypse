import os
import json

image_folder = "../temp"

# Ensure the folder exists
if not os.path.exists(image_folder):
    print(f"Error: Folder '{image_folder}' not found.")
    exit()

# Get the list of images
image_list = [f"temp/{file}" for file in os.listdir(image_folder) if file.lower().endswith((".jpg", ".png", ".jpeg", ".gif"))]

# Save to JSON file
with open("images.json", "w") as f:
    json.dump(image_list, f)

print("Image list saved! Contents:")
print(json.dumps(image_list, indent=2))
