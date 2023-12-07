import polars as pl
from datetime import datetime

class ParseData():
    
    def __init__(self):
        self.df_indispo = self.get_indispo()
        self.df_origine = self.get_origine()


    # Origine.json
    def get_origine(self):
        return pl.read_json('data/origine.json').unnest('fields')\
            .drop( 'datasetid', 'perimetre_spatial', 'perimetre_juridique',
            'recordid', 'category', 'sub_category', 'tri', 'record_timestamp')

    def getOverYears(self, energy):
        return (self.df_origine.filter(pl.col('sous_categorie') == energy)
                .drop('unite', 'categorie', 'sous_categorie').to_dicts())

    def getEnergies(self, year):
        df_updated = self.df_origine.filter(
            (pl.col('annee') == str(year)) &
            (pl.col('categorie').str.starts_with('Source'))
            ).to_dict(as_series=False)
        df_updated['categorie'] = df_updated['sous_categorie']
        del df_updated['sous_categorie']
        del df_updated['unite']
        df_updated.pop('annee')
        return df_updated

    def getPollution(self, year):
        df_updated = self.df_origine.filter(
            (pl.col('annee') == str(year)) &
            (pl.col('categorie').str.starts_with('Source') == False)
            ).to_dict(as_series=False)
        if int(year) <= 2019:
            df_updated['valeur'][1] += df_updated['valeur'][2]
            for key in df_updated:
                del df_updated[key][2]
        df_updated.pop('annee')
        return df_updated


    # indispo.json
    def get_indispo(self):
        df = (pl.read_json('data/indispo.json').unnest('fields')
            .drop( 'datasetid', 'perimetre_spatial', 'perimetre_juridique',
            'recordid', 'category', 'numero_de_version', 'identifiant', 'record_timestamp',
            'date_de_fin', 'date_de_debut')
            .with_columns(
                pl.col('date_de_publication').str.split('T').cast(pl.List(pl.Utf8)).list.get(0).cast(pl.Utf8)))

        return (df.with_columns(pl.col('filiere').str.replace_all('Réservoir hydraulique', 'Hydraulique')
            .str.replace_all('Fil de l\'eau et éclusé hydraulique', 'Hydraulique')
            .str.replace_all('Station de transfert d\'énergie par pompage hydraulique', 'Hydraulique')
            .str.replace_all('Eolien offshore', 'Autres Renouvelables').str.replace_all('Fuel / TAC', 'Fioul')
            .str.replace_all('Gaz fossile', 'Gaz').str.replace_all('Houille fossile', 'Charbon')))
    
    def getInfoEnergy(self, energy, year):
        return self.df_indispo.filter(
            pl.col('filiere') == energy,
            pl.col('date_de_publication').str.contains(str(year))
        ).to_dict(as_series=False)