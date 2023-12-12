import polars as pl

class ParseData():
    
    def __init__(self):
        self.df_origine = self.get_origine()
        self.df_previsions = self.get_previsions()


    # Origine.json
    def get_origine(self):
        return pl.read_json('data/origine.json').unnest('fields')\
            .drop( 'datasetid', 'perimetre_spatial', 'perimetre_juridique',
            'recordid', 'category', 'sub_category', 'tri', 'record_timestamp')

    def getOverYears(self, energy):
        new_df = (self.df_origine.filter(pl.col('sous_categorie') == energy)
                .drop('unite', 'categorie', 'sous_categorie').to_dicts())
        df2 = self.df_previsions.select([energy, 'annee']).to_dicts()
        for i in range(len(df2)):
            df2[i]['valeur'] = df2[i][energy]
            del df2[i][energy]
        for i in range(len(df2)):
            new_df.insert(0, df2[i])
        return new_df

    def getEnergies(self, year):
        if str(year) >= '2021':
            new_df = self.df_previsions.filter(pl.col('annee') == str(year)).drop('annee').to_dicts()
            new_dict = {
                'valeur': [],
                'categorie': []
            }
            for item in new_df[0]:
                new_dict['valeur'].append(new_df[0][item])
                new_dict['categorie'].append(item)
            return new_dict
        else:
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


    # Previsions
    def get_previsions(self):
        df = (pl.read_json('data/previsions.json').unnest('fields')
            .drop('datasetid', 'recordid', 'scenario', 'record_timestamp', 'effacements'))
        new_df = (df.with_columns(
            Nucléaire=pl.col('nucleaire'),
            Fioul=pl.col('fioul_lourd'),
            Hydraulique=pl.col('hydraulique'),
            Charbon=pl.col('charbon'),
            Gaz=(pl.col('turbines_a_combustion') + pl.col('autres_moyens_thermiques') + pl.col('cogenerations')).round(2),
            Renouvelables=(pl.col('photovoltaique') + pl.col('energies_marines') + pl.col('eolien')).round(2))
            .drop('bioenergies', 'photovoltaique', 'cogenerations', 'nucleaire',
                'turbines_a_combustion', 'autres_moyens_thermiques', 'cycles_combines_au_gaz',
                'eolien', 'charbon', 'hydraulique')).to_dicts()
        for i in range(len(new_df)):
            del new_df[i]['energies_marines']
            del new_df[i]['fioul_lourd']
            new_df[i]['Autres Renouvelables'] = new_df[i].pop('Renouvelables')
        return pl.DataFrame(new_df)