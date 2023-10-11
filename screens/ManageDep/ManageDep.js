import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    FlatList,
    Modal,
    ScrollView, // add ScrollView
} from 'react-native';
import { HorizontalListCard } from '../../components';
import { dummyData, COLORS, SIZES, FONTS, icons, images, SHADOWS } from '../../constants';

const ManageDep = () => {

    const [selectedCategoryId, setSelectedCategoryId] = React.useState(1);
    const [selectedMenuType, setSelectedMenuType] = React.useState(1);
    const [menuList, setMenuList] = React.useState([]);

    React.useEffect(() => {
        handleChangeCategory(selectedCategoryId, selectedMenuType);
    }, []);

    //handlers
    function handleChangeCategory(categoryId, menuTypeId) {
        //find the menu base on menuTypeID
        let selectedMenu = dummyData.menu.find(a => a.id == menuTypeId);

        setMenuList(selectedMenu?.list.filter(a => a.categories.includes(categoryId)));
    }
    
    return (
        <View style={{ flex: 1 }}>
            {/* Header */}

            {/* MenuList */}
            <ScrollView >
                <FlatList
                    data={menuList}
                    keyExtractor={(item) => `${item.id}`}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) => { 
                        return (
                            <HorizontalListCard
                                containerStyle={{
                                    backgroundColor: index === 0 ? COLORS.lightOrange3 : COLORS.lightGray2,
                                    marginTop: SIZES.padding,
                                    marginHorizontal: SIZES.padding,
                                    borderRadius: SIZES.radius,
                                    ...SHADOWS.dark
                                }}
                                item={item}
                                onPress={() => console.log("HorizontalListCard")}
                            />
                        )
                    }}
                />
            </ScrollView>

        </View>

    )
}

export default ManageDep;
