from flask import Flask, request, jsonify, send_file
from dockstring import load_target
from rdkit import Chem
from rdkit.Chem import Draw
import io


def dock_smile():
    # Get data from the request
    data = request.get_json()
    smiles = data.get('smiles')
    target_name = data.get('target')
    
    print("docking ... 0", smiles, target_name)

    if not smiles or not target_name:
        return jsonify({'error': 'Missing SMILES or target name'}), 400

    # Load the target and perform docking
    try:
        print("docking ... 0.1")
        target = load_target(target_name)
        print("docking ... 0.2")
        score, aux = target.dock(smiles)
        print("docking ... 0.3")
        # Extract ligand info and affinities
        ligand = aux.get('ligand')
        affinities = aux.get('affinities', [])

        # Create a dictionary for ligand properties
        ligand_properties = {
            'smiles': smiles,
            'molecular_weight': Chem.rdMolDescriptors.CalcExactMolWt(ligand),
            # Add other properties as needed
        }
        print("docking ... 1")
        # Generate an image of the ligand
        img = Draw.MolToImage(ligand)
        img_byte_array = io.BytesIO()
        img.save(img_byte_array, format='PNG')
        # save locally
        img.save(f"{smiles}.png")
        img_byte_array.seek(0)

        print("docking ... 2")

        # Prepare the response
        response = {
            'score': score,
            'ligand': ligand_properties,
            'affinities': affinities,
        }

        # Return JSON response with ligand image
        return jsonify(response), 200, {'Content-Type': 'application/json', 'X-Ligand-Image': img_byte_array.getvalue().decode('latin1')}
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

