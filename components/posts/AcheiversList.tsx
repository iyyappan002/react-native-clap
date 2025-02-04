import { useLastMonthAchieversQuery } from "@/api/queries";
import React, { useMemo } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import AcheiverCard from "./AcheiverCard";
import SkeletonLoading from "expo-skeleton-loading";

function AcheiversList() {
  const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useLastMonthAchieversQuery();

  const achievers = useMemo(() => {
    return data?.pages?.at(0)?.lastMonthAchievers?.slice(0, 5) ?? [];
  }, [data?.pages]);
  console.log({ achievers, data: data?.pages });

  if (isLoading)
    return (
      <SkeletonLoading background={"#cacaca"} highlight={"#ffffff"}>
        <View
          style={{
            flexDirection: "column",
            borderRadius: 10,
            borderWidth: 1,
            marginBottom: 15,
            paddingBottom: 10,
            paddingHorizontal: 2,
          }}
        >
          <View>
            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
                justifyContent: "space-between",
                paddingBottom: 10,
              }}
            >
              <View
                style={{
                  width: "40%",
                  height: 20,
                  backgroundColor: "#cacaca",
                  borderRadius: 10,
                }}
              />
              <View
                style={{
                  width: "20%",
                  height: 20,
                  backgroundColor: "#cacaca",
                  borderRadius: 10,
                }}
              />
            </View>
            <View style={{ flexDirection: "row", gap: 10 }}>
              <View
                style={{
                  width: 80,
                  height: 80,
                  backgroundColor: "#cacaca",
                  borderRadius: 40,
                }}
              />
              <View
                style={{
                  width: 80,
                  height: 80,
                  backgroundColor: "#cacaca",
                  borderRadius: 40,
                }}
              />
            </View>
          </View>
        </View>
      </SkeletonLoading>
    );

  return (
    <View style={styles.container}>
      <View style={styles.lastMonthCard}>
        <View style={styles.lastMonthtitle}>
          <Text style={styles.lastMonthText}>Last Month Achievers</Text>
          <Text style={styles.seeAll}>See All</Text>
        </View>
        <ScrollView horizontal>
          {achievers.map((achiever) => (
            <AcheiverCard key={achiever.id.toString()} acheiver={achiever} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 4,
  },
  lastMonthCard: {
    backgroundColor: "white",
    padding: 20,
  },
  lastMonthtitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  lastMonthText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  seeAll: {
    fontSize: 14,
    color: "#2B93E7",
  },
});

export default AcheiversList;
